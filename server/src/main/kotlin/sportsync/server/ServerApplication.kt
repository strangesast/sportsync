package sportsync.server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@SpringBootApplication
@EnableReactiveMongoRepositories
class ServerApplication

fun main(args: Array<String>) {
    runApplication<ServerApplication>(*args)
}
