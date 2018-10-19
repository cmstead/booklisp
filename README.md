
# Booklisp #
#### A Language for Building Documents ####

## Table Of Contents ##

- Chapter 1: Introduction
- Chapter 2: Examples

## Introduction ##

#### What Booklisp Is ####

Booklisp is a language for people who want the compositional support LaTeX provides, but with the ease of Markdown authoring. Although Booklisp is still in the developmental stages, it is still possible to build large, complex documents without setting your hair on fire.

Booklisp content is just Markdown.  Any Booklisp Markdown is valid Github Flavored Markdown (GFM) with embedded HTML comments.

Booklisp executable blocks are a simple DSL utilizing Lisp-style syntax, making the work of composing complex documents little more than declaring what you want... and a few parens.

This readme was even created with Booklisp!

#### What Booklisp Is Not ####

Booklisp is NOT a complete, standalone language.  It is simply designed to make the process of compiling documents simpler for authors.

Booklisp is NOT a replacement for LaTeX.  If you need the power, the language exists for a reason.

Booklisp is NOT finished.  It is likely the project will continue to grow over time.  To see the current state of the project it is worth having a look at the todo list.

#### How to Find Me ####

Find me online:
- [@cm_stead](https://twitter.com/cm_stead)
- [ChrisStead.com](http://www.chrisstead.com)
    

## Examples ##

The best example of Booklisp is to simply look at the source files for the readme doc you are reading right now.  Here is the main source file as I write this examples file:

```
< --bl
(filemeta
    (title "Booklisp")
    (subtitle "A Language for Building Documents"))

(table-of-contents
    (chapter "./readme-source/chapters/introduction.md")
    (chapter "./readme-source/chapters/examples.md")
)
/bl-- >;
```

In this example, the file metadata -- filemeta -- contains a title, "Booklisp", and a subtitle "A Language for Building Documents".  The main source file also contains a table of contents which captures information about the chapters contained within the document.

Each of the identifiers here is a function:
- filemeta
- title
- subtitle
- table-of-contents
- chapter

This means you can simply type what you mean and the compiler will interpret and create your document. Each document must contain a filemeta expression. All arguments to filemeta are optional.

Here's what a chapter file looks like:

```
< --bl
(filemeta
    (title "My Chapter"))

In this chapter, we look at an example of a chapter example. ;-)
/bl-- >
```

That's it!
    

    