#!/usr/bin/env python3
"""
Module for 10-update_topics.py
0x0D-NoSQL
Holberton Web Stack programming Spec ― Back-end
"""
import pymongo


def update_topics(mongo_collection, name, topics):
    """
    Changes all topics of a school document based on the name
    """
    return mongo_collection.update_many({"name": name},
                                        {"$set": {"topics": topics}})
