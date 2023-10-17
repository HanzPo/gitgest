# GitGest - Hack the Valley 2023 Project
##  💡Inspiration
When you're working on a repository with other people, you sometimes miss a lot of commits from your fellow collaborators. It could be because you've been on a break, were on vacation, or have gotten busy with schoolwork. However, reading through hundreds of lines of code to be able to understand what you've missed does get tedious, even for experienced developers. That's when we had the idea to create GitGest, a website that summarizes GitHub repositories for easy reading. 

## 💪What it does
GitGest takes in a repository URL and a user's username and grabs all commit comments since the user's most recent commit (or grabs all commit comments if the User hasn't made any contributions) and summarizes them into a clear description of all changes.

## 🪛How we built it
We built this by using React, HTML, and CSS for the front end and Flask, GitHub API, and Cohere's summarization API for the backend. After logging in through GitHub via OAuth, the user provides a repository URL and a username. We then use GitHub's API to GET request the commit history and compare the authors with the username given, compiling the commits whose authors don't match the username into a list. This list is sent to Cohere's summarization AI through a GET request. The summary from the JSON response of the API is then put into the frontend of the website.

## 🚧Challenges we ran into
One of our major problems was deciding on an idea. We went from an app that uses the Paybilt API to a GitHub game and finally to this! It was 4:00 AM on Saturday morning that we finally decided. Naturally, this also means we were more behind than other teams in the development process. Our group also struggled to understand how to make requests from the backend to the frontend, retrieve the commit history from a GitHub repository URL, make the frontend do what we wanted due to a lack of experience in CSS, and manage our time as 3 of our 4 group members are first university students with midterms (that we are absolutely going to fail) the day after the hackathon. We were also new to authentication on web applications, so implementing the OAuth login system was a challenge. Finally, we tried to deploy our app through Google Cloud Services, however, it proved to be beyond our abilities within the time allowed.

## 🏅Accomplishments that we're proud of
Being able to successfully use OAuth to allow GitHub logins and let users access private respositories. Getting used to REST.APIs for sending requests between the frontend and backend, getting used to third-party services such as Cohere, creating an aesthetically pleasing and cohesive website that works as intended, and understanding how to access a GitHub repository's information.

## 🏫What we learned
We learned to program in Python with Flask and Javascript with React, we learned how to store environments in variables, how to communicate with the Cohere API, make the front end communicate with the backend, deal with all the dynamic components on the frontend, and make sure that all possible cases are accounted for. We also learned how to implement OAuth in our application.

## ⏭️What's next for GitGest
Our future plans for GitGest are to use Cohere API to read the code itself and summarize that information alongside the commit comments in case the comments provided by the contributors are less than adequate. Furthermore, we would also like to use Cohere API to read the commit comments and rate them on their usefulness and readability for other contributors helping to reinforce the habit of good commenting.

