#!/usr/bin/env python3
"""
Module for exercise.py
0x0B_redis_basic
Holberton Web Stack programming Spec ― Back-end
"""
from functools import wraps
import redis
from typing import Union, Callable, Optional
import uuid


def count_calls(method: Callable) -> Callable:
    """
    Counts how many times methods of the Cache class are called
    """
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        """
        Increments the count for a key every time the method is called
        Return:
            Value returned by the original method
        """
        self._redis.incr(method.__qualname__)
        return method(self, *args, **kwargs)
    return wrapper


def call_history(method: Callable) -> Callable:
    """
    Stores the history of inputs and outputs for a called function
    """
    @wraps(method)
    def wrapper(self, *args):
        """
        Adds method's input parameters to one list in redis,
        and store its output into another list
        """
        self._redis.rpush(f"{method.__qualname__}:inputs", str(args))
        output = method(self, *args)
        self._redis.rpush(f"{method.__qualname__}:outputs", str(output))
        return output
    return wrapper


def replay(fn: Callable) -> str:
    """ Displays the history of calls of a particular function """
    # method: __qualname__
    method = fn.__qualname__
    inputs = f"{method}:inputs"
    outputs = f"{method}:outputs"
    inp_list = fn.__self__._redis.lrange(inputs, 0, -1)
    out_list = fn.__self__._redis.lrange(outputs, 0, -1)
    Q = fn.__self__._redis.get(method).decode('utf-8')
    print(f"{method} was called {Q} times:")
    for inp, out in zip(inp_list, out_list):
        print(f"{method}(*{inp.decode('utf-8')}) -> {out.decode('utf-8')}")


class Cache:
    """ Defines the class Cache """
    def __init__(self):
        """ Constructor """
        self._redis = redis.Redis()
        self._redis.flushdb()

    @count_calls
    @call_history
    def store(self, data: Union[str, bytes, int, float]) -> str:
        """
        Generates a random key using uuid and stores the input data in Redis
        Return:
            Random generated key
        """
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key

    def get(self, key: str, fn: Optional[Callable] = None) ->\
            Union[str, bytes, int, float]:
        """
        Gets a value from the redis data instance and converts it back
        to the desired format using the passed Callable `fn`
        Return:
            Data in its original type/format
        """
        data = self._redis.get(key)
        if data and fn:
            return fn(data)
        return data

    def get_str(self, data: bytes) -> str:
        """ Converts to string data type """
        return data.decode("utf-8")

    def get_int(self, data: bytes) -> int:
        """ Converts to int data type """
        return int(data)
