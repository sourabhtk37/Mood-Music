from django.shortcuts import render
from django.http import HttpResponse
import json
import requests
import praw


def sentiment_analyser(request):
	"""
	retrieves a url to scrape and returns sentiment
	"""
	s=request
	return HttpResponse(s) 

def deploy_detail(request):
	"""
	To receive the deployment detail from app
	"""
	return HttpResponse("Received")