package sportsync.server

import org.springframework.data.mongodb.repository.ReactiveMongoRepository

interface BoardTemplateRepository: ReactiveMongoRepository<BoardTemplate, String> {}
