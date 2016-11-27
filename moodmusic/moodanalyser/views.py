from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import cgi
import requests
#import praw


def sentiment_analyser(request):
	"""
	retrieves a url to scrape and returns sentiment
	"""
	s=request
	return HttpResponse(s) 

@csrf_exempt
def deploy_detail(request):
	"""
	To receive the deployment detail from app
	"""
	form = cgi.FieldStorage(
		environ={'REQUEST_METHOD':'POST'}
	)
	data=form.getvalue("OS")
	r=request.POST
	return HttpResponse(data)


