package sportsync.server

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class BoardTemplate(
  @Id var id: String?,
  var name: String,
  var elements: List<BoardTemplateElement> = listOf(),
  var size: BoardTemplateSize = BoardTemplateSize(128, 32)
)

data class BoardTemplateSize(var width: Long, var height: Long)

data class BoardTemplateElement(
  var id: String,
  var x: Float,
  var y: Float,
  var text: String,
  var color: String,
  var font: String
)
