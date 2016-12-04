from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import cgi
import requests
#import praw

@csrf_exempt
def sentiment_analyser(request):
	"""
	retrieves a url to scrape and returns sentiment
	"""
	print request.body["name"]
	# request_body_size = 
	# return HttpResponse(request['wsgi.post_form']) 
	return HttpResponse("done")

@csrf_exempt
def deploy_detail(request):
	"""
	To receive the deployment detail from app
	"""
	data=json.loads(request.body)
	return HttpResponse(data)


