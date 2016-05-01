# Contributing to TeachOSM

Thank you for your interest in contributing to [teachosm.org](http://teachosm.org). We explain here how to make
contributions to this repository. We can also coordinate work by creating an ['issue' here on github](https://github.com/osmlab/teachosm/issues?state=open), and discussion on the [TeachOSM Mailing list](https://lists.openstreetmap.org/listinfo/teachosm). Be sure to follow these channels if you are interested in ongoing contribution. 

## Relationship to LearnOSM

This site started as a fork of the great work done by the folks who contributed to [LearnOSM](http://learnosm.org).  The materials here on TeachOSM.org in many cases complement the materials found at LearnOSM. The intent to date, has been to mirror the structure of TeachOSM materials after the structure of LearnOSM. Depending on the volume and complexity of your contribution, it may be useful to have a look at how LearnOSM is put together prior to submitting your content.

## Translations and related text modifications

Daniel Joseph has written a [detailed explanation of the translation workflow](https://github.com/AmericanRedCross/Guides/blob/master/TranslationWorkflow_LearnOSM/translatorWorkflow.md) assuming no technical/github know-how.  The explanation is intended for LearnOSM but should also be useful for this site.

The outline procedure for contributing is: [fork the TeachOSM repository](https://help.github.com/articles/fork-a-repo), improve content or site, then issue a [pull request](https://help.github.com/articles/using-pull-requests).

TeachOSM is built with [Jekyll](http://jekyllrb.com/). All content can be found under `_posts/`. The site is multilingual and posts are organized by language code (`_posts/id`, `_posts/en`, `_posts/es`, etc).

It's handy to run the site locally when editing content or code. Jekyll documentation contains a good section on [installation](http://jekyllrb.com/docs/installation/).

For fresh translations always start with a copy of the English guide.

### Quick install guide for Windows

- Download and install [Ruby 1.9](http://rubyinstaller.org/downloads/), enable the PATH setting during installation
- Open a command prompt (cmd.exe) and install jekyll by typing `gem install jekyll`
- Install kramdown by typing `gem install kramdown --platform=ruby -v 2.1.1`
- Navigate to your local teachosm repository `cd C:\teachosm`
- Start the local webserver by executing the following 2 commands, or save them to a .bat file and start:

	```
    chcp 65001
    jekyll --kramdown > jekyll_log.txt 2> jekyll_errorlog.txt
    ```

- Open a browser and go to localhost:4000

### For Mac 

- Make sure your version of Ruby is up to date
- gem install jekyll
- gem install kramdown
- From within your local teachosm repository, jekyll serve --w
- Open a browser and go to localhost:4000

### Front matter for guide documents

Each chapter in a guide constitutes a markdown document. In order to handle languages and translations and to relate the document with a specific guide and a couple of [YAML Frontmatter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) rules need to be in place.

Example front matter for a guide chapter:

    layout: doc
    title: Moving Forward
    permalink: /en/beginner/moving-forward/
    lang: en
    category: beginner

Explanation:

- `layout` must be `doc`
- `title` is the plain title of the document, must not be repeated in the document's body
- `permalink` is the path to the document, must contain the language prefix (`en` in this case)
- `lang` is the language prefix of the document and must be the same as in `permalink`. This is redundant with `permalink` for Jekyll specific reasons.
- `category` contains the guide's shortname (currently there is only one guide in the Jekyll site: `beginner`).

## Contributing to site

Same as with content, to contribute, [fork this repository](https://help.github.com/articles/fork-a-repo), modify, then issue a [pull request](https://help.github.com/articles/using-pull-requests).

The site is hosted using [GitHub Pages](http://pages.github.com/), any changes to the gh-pages branch automatically update the site within minutes.
