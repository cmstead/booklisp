<!--bl
(filemeta
    (title "Examples"))
/bl-->

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