#!/usr/bin/env python3
"""
Module for 9-insert_school.py
0x0D-NoSQL
Holberton Web Stack programming Spec ― Back-end
"""
import pymongo


def insert_school(mongo_collection, **kwargs):
    """
    Inserts a new document in a collection based on `kwargs`
    """
    return mongo_collection.insert_one(kwargs).inserted_id
