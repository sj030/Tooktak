#let team_name = "TOOKTAK"
#let title = "요구사항 분석 및 설계서"
#let sub_title = "산합협력프로젝트1(종합설계)"
#let authors = (
  team_name,
  "202011289 문찬규",
  "202011290 민지홍",
  "202011356 임제형",
  "202211328 윤찬규",
  text("202211404 황서진", weight: "bold")
)

#let modify = (
  date: "2024-04-08",
  log: (
  )
)

#let head = {
  [
    #text(weight: 700)[#team_name]
    #text(weight: 400)[#sub_title]
    #h(1fr)
    #text(weight: 400)[#title]
    
    #line(length: 100%, stroke: 0.2pt)
  ]
}

#let indent = { h(4pt) }

#let enter = {
   box(baseline: 0em, 
    height:0.7em, 
  )[#rect(
    fill: rgb(233,233,233),
    stroke: gray, 
  )[#text("Enter↵", baseline: -0.5em, font:"Cascadia Mono", size: 10pt)]]
  
}

#let tab = {
  box(baseline: 0em, 
    height:0.7em, 
    fill: rgb(233,233,233),
    stroke: gray,
  )[#rect(
    fill: rgb(233,233,233),
    stroke: gray, 
  )[#text("Tab↹", baseline: -0.5em, font:"Cascadia Mono", size: 10pt)]]
  
}

#let prompt(content, lang:"md") = {
  box(
    inset: 15pt,
    width: auto,
    fill: rgb(247, 246, 243, 50%),
  )[#text(content, font: "Cascadia Mono", size: 0.8em)]
}

#let project(title: "", authors: (), logo: none, body) = {
  set text(9pt, font: "Pretendard")
  set heading(numbering: "1.")
  set page(columns: 1, numbering: "1  /  1", number-align: center, header: head)
  show outline.entry.where(level: 1): it => {
    v(25pt, weak:true)
    strong(it)
  }
  show heading : it => { it; v(0.5em);}
  
  align(center)[
    #block(text(weight: 800, 1.75em, title))
  ]
  pad(
    top: 0.5em,
    bottom: 0.5em,
    x: 2em,
    grid(
      columns: (1fr,) * calc.min(1, authors.len()),
      gutter: 1em,
      ..authors.map(author => align(center, author)),
    ),
  )
  set par(justify: true)
  if modify.log.len() != 0 {
    text("마지막 변경 일자: [" + modify.date + "]\n");
    text("수정 내역: \n"); 
    for log in modify.log {
      text("- " + log + "\n");
  }
  }

  outline(title: "목 차", depth: 5, indent: 1em, fill: repeat(text(weight: 700)[.#h(0.5em)]))

  body
}