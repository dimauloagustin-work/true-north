Run the project locally:
  Prerequisites:
    docker
    docker-compose
    node v18
  Backend:
    run the following comands:
      cd back
      npm i
      cd ..
      docker-compose up
  Front:
    run the following comands:
    cd app
    npm i 
    npm start

Run the project in production:
  Prerequisites:
    docker
    docker-compose
  Front and back:
    replace credentials in docker-compose.prod
    run docker-compose up (using docker-compose.prod)
