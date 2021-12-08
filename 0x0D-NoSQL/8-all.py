#!/usr/bin/env python3
"""
Module for 8-all.py
0x0D-NoSQL
Holberton Web Stack programming Spec ― Back-end
"""
import pymongo


def list_all(mongo_collection):
    """
    Lists all documents in a collection
    """
    if not mongo_collection:
        return []
    return list(mongo_collection.find())
