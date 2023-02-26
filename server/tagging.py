#import spacy
import openai
import os
from dotenv import load_dotenv

load_dotenv()
#nlp = spacy.load("en_core_web_sm")
#doc = nlp("I played tennis with Ike and John the other day. They were both really nice to me. Yesterday, I watched a movie with Hunter. I did some bench pressing and then did squats all while at the gym. I also bouldered because I'm so cool. That was with Reece and Hunter though. I ate strawberry ice cream at Mitchells. I am so sad now. I ate chocolate ice cream at a different ice cream place because I decided I hate Mitchells now. I played tennis with Ike and John the other day. They were both really nice to me. Yesterday, I watched a movie with Hunter. I did some bench pressing and then did squats all while at the gym. I also bouldered because I'm so cool. That was with Reece and Hunter though. I ate strawberry ice cream at Mitchells. I am so sad now. I ate chocolate ice cream at a different ice cream place because I decided I hate Mitchells now.")
#deps = [token.dep_ for token in doc]
#print(deps)
#chunks = [chunk.text for chunk in doc.noun_chunks]
#print(chunks)
#print(doc.ents)

class Tagging:
    def __init__(self, **kwargs):
        openai.api_key = os.getenv("OPENAI_API_KEY")
        self.categories = ["entertainment", "sports", "food", "work", "relationship, location"]
        if "categories" in kwargs:
            self.categories = kwargs["categories"]
    
    def categorize(self, text):
        relations = self.openai_category_response(text)
        db_request = {}
        relations_lines = relations.split("\n")
        for line in relations_lines:
            if len(line) == 0:
                continue
            db_request[line.split(":")[0].lower()] = [word.strip() for word in line.split(":")[1].split(", ") if len(word) > 0]
        print(db_request)
        return db_request 
    
    def keywords(self, text):
        relations = self.openai_keyword_response(text).strip().split(":")[1].strip()
        db_request = {
            "keywords": [word.strip() for word in relations.split(", ") if len(word) > 0]
        }
        print(db_request)
        return db_request

    def _similarity(self, word1, word2):
        #spacy
        pass
    
    def openai_keyword_response(self, text):
        return self.response(f"Extract keywords from the text\ntext: {text}").choices[0].text
    
    def openai_category_response(self, text):
        return self.response(f"Extract keywords from the text and tag them with the labels of categories. Put each keyword into categories\ncategory : [{','.join(self.categories)}]\ntext: {text}").choices[0].text
    
    def response(self, prompt): return openai.Completion.create(
    engine="text-davinci-003",
    prompt=prompt,
    temperature=0.7,
    max_tokens=150,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )

tag = Tagging()
tag.categorize("I played tennis with Ike and John the other day. They were both really nice to me. Yesterday, I watched a movie with Hunter. I did some bench pressing and then did squats all while at the gym. I also bouldered because I'm so cool. That was with Reece and Hunter though. I ate strawberry ice cream at Mitchells. I am so sad now. I ate chocolate ice cream at a different ice cream place because I decided I hate Mitchells now. ")
tag.keywords("I played tennis with Ike and John the other day. They were both really nice to me. Yesterday, I watched a movie with Hunter. I did some bench pressing and then did squats all while at the gym. I also bouldered because I'm so cool. That was with Reece and Hunter though. I ate strawberry ice cream at Mitchells. I am so sad now. I ate chocolate ice cream at a different ice cream place because I decided I hate Mitchells now. ")




        