from flask import jsonify, request
from flask_cors import CORS
from flask_openapi3 import OpenAPI, Info, Tag
from pydantic import BaseModel, Field
import json

def write_json(listItem, filename="./list.json"):
    with open(filename, "r+") as file:
        list = json.load(file)
        list.append(listItem)
        file.seek(0)
        json.dump(list, file, indent=4)
    
def getList():
    with open("./list.json") as file:
        currentList = json.load(file)
        return currentList

class NotFoundResponse(BaseModel):
    code: int = Field(-1, description="Status Code")
    message: str = Field("Resource not found!", description="Exception Information")

class ValidationErrorModel(BaseModel):
    code: int = Field(-1, description="Status Code")
    message: str = Field("Validation error!", description="Exception Information")

class FoundResponse(BaseModel):
    code: int = Field(-1, description="Status Code")
    message: str = Field("Success!", description="Success information")

class Message(BaseModel):
    message: str = Field(None, description="message")
    


info=Info(title="Hello World API", version="1.0.0")
app = OpenAPI(__name__, info=info, responses={404: NotFoundResponse, 200: FoundResponse}, security_schemes={}, validation_error_model=ValidationErrorModel)
CORS(app, origins=["http://localhost:3000"])

hello_tag = Tag(name="hello-world", description="returns a json object with a message property with value 'Hello world!")
thanks_tag = Tag(name="thanks", description="returns a json object with a message property with value 'thanks")
add_tag = Tag(name="add", description="adds item to list")
list_tag = Tag(name="list", description="fetches ;ost")

@app.get("/hello-world", tags=[hello_tag], responses={200: Message})
def hello_world() -> Message:
    return jsonify({
        "message": "Hello world"
    })

@app.get("/thanks", tags=[thanks_tag])
def thanks() -> Message:
    return jsonify({
        "message": "thanks"
    })

@app.get("/list", tags=[list_tag])
def list():
    return getList()

@app.post("/addToList" ,tags=[add_tag])
def add(body: Message): 
    message=request.json.get("message")
    newID = len(getList())
    listItem = {newID: message}
    write_json(listItem)
    return "Item added!"
    

if __name__ == "__main__":
    app.run(debug=True, port=8080)