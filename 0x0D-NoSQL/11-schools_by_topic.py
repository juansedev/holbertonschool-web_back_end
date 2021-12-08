#!/usr/bin/env python3
"""
Module for 11-schools_by_topic.py
0x0D-NoSQL
Holberton Web Stack programming Spec ― Back-end
"""
import pymongo


def schools_by_topic(mongo_collection, topic):
    """
    Returns the list of school having a specific topic
    """
    return mongo_collection.find({"topics": topic})
