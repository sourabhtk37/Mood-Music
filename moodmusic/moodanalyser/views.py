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
