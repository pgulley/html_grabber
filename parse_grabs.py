import json

def load_grabber(grabber_loc):
	return json.load(open(grabber_loc,"r", encoding="utf-8"))