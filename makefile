start:
	docker-compose start
stop:
	docker-compose stop
down:
	docker-compose down
up:
	docker-compose up
up-d:
	docker-compose up -d
watch:
	docker exec -ti app-express-ts npm run watch
pgadmin:
	google-chrome http://localhost:5050