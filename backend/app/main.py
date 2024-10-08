import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import students, professors, courses, files

origins = [
    "https://sustav-za-upravljanje-kolegijima.vercel.app",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def test():
    return {"Hello": "World"}

app.include_router(students.router)
app.include_router(professors.router)
app.include_router(courses.router)
app.include_router(files.router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

