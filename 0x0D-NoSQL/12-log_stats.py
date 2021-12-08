#!/usr/bin/env python3
"""
Module for 12-log_stats.py
0x0D-NoSQL
Holberton Web Stack programming Spec ― Back-end
"""
import pymongo


def count_documents(mong_collection, obj={}):
    """
    Counts collection documents
    """
    return mong_collection.count_documents(obj)


def log_stats():
    """
    Provides some stats about Nginx logs stored in MongoDB:
        - Database: logs
        - Collection: nginx
    """
    client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
    nginx_coll = client.logs.nginx

    print(f"{count_documents(nginx_coll)} logs")
    print("Methods:")
    for method in ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']:
        no_docs = count_documents(nginx_coll, {'method': method})
        print(f"\tmethod {method}: {no_docs}")

    check = count_documents(nginx_coll, {'method': 'GET', 'path': '/status'})
    print(f"{check} status check")


if __name__ == '__main__':
    log_stats()
