# Skill Tracker

![Skill Tracker Page](frontend/public/page.png 'Skill tracker Page')

Skill tracker is a web app that allows users to record
their skills and time spent on that skill. The inspiration was
from reading atomic habbits where 1% everyday becomes a huge improvement in a long term and 1% decay becomes a a huge loss.

Each skill has time spent and skill level.Skill level can be affected by decay when you miss a day. Skills also have a streak system that resets when you miss out a day. The streak applies a multiplier to the time added that is then converted to skill level.

The skill system also has a rank system that allows the skill level not to fall below a certain threshold. To be able to attain
the rank you must be able to have more skill level than the threshold.

## features

- users can create and delete skills
- skill has decay system and streak system
- rank system for skills
- a timer that adds steps to skills

## installation

1.Open your terminal and clone the repo

```sh
 git clone https://github.com/RoniGuru/Skill-Tracker.git
```

2.Go to the Skill-Tracker folder

```sh
cd Skill-Tracker
```

2.Go to the backend folder

```sh
cd backend
```

3.install all dependencies

```sh
npm  install
```

4.To run the server use this command. Make sure you have your
own mongoose string and port in a env file in the backend folder

```sh
npm run serve
```

5.Now go to another terminal and into the frontend

```sh
cd frontend
```

6.Install all the dependencies in that folder

```sh
npm  install
```

7.Create a .env file in the folder and put this VITE_API_URL = "http://localhost:5000/skills" with the number being the same as port number specified. Then use run dev to deploy the frontend

```sh
npm run dev
```

8.Now you can play around with the skill tracker.
