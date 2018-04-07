package sportsync.server

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.MediaType
import org.springframework.web.reactive.function.server.*
import org.springframework.web.reactive.function.server.ServerResponse.ok
import reactor.core.publisher.Mono
import reactor.core.publisher.toMono

@Configuration
class Controller {

  @Bean
  fun router(repo: BoardTemplateRepository) = router {
    GET("/") {
      ok().contentType(MediaType.APPLICATION_JSON).body(Mono.just(mapOf("toast" to "toast")))
    }

    "/templates".nest {
      GET("/") {
        val q = repo.findAll()
        ok().contentType(MediaType.APPLICATION_JSON).body(q)
      }

      POST("/") {
        val body = it.bodyToMono<BoardTemplate>()
        val res = repo.insert(body)
        ok().contentType(MediaType.APPLICATION_JSON).body(res.toMono())
      }

      GET("/{id}") {
        val id = it.pathVariable("id")
        val res = repo.findById(id)
        ok().contentType(MediaType.APPLICATION_JSON).body(res)
      }

      // reactive mongo repository is a capped collection.  updates are not permitted
      POST("/{id}") {
        val id = it.pathVariable("id")
        val body = it.bodyToMono<BoardTemplate>()
        val res = body.flatMap { body ->
          repo
            .findById(id)
            .flatMap {
              it.elements = body.elements;
              it.name = body.name;
              it.size = body.size;
              repo.save(it)
            }
        }
        ok().contentType(MediaType.APPLICATION_JSON).body(res);
      }
    }
  }
}
