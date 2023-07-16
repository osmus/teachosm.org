---
---

const DEFAULT_THUMBNAIL = 'https://{{ site.PICS_UPLOADS_BUCKET }}-{{ site.STAGE }}.s3.amazonaws.com/default-thumbnail.jpg';


class ProjectFilter {
  constructor ({ clearElement, filterElements, filterOptions, projects, projectsElement, searchElement, tagOptions, tagsElement }) {
    this.clearElement = clearElement;
    this.filterElements = filterElements;
    this.filterOptions = filterOptions;
    this.filters = {};
    filterOptions.forEach(option => this.filters[option.name] = []);
    this.tagsElement = tagsElement;
    this.tagOptions = tagOptions;
    this.tags = [];
    this.searchElement = searchElement;
    this.search = "",
    this.projects = projects;
    this.projectsElement = projectsElement;
    this.addEventListeners();
    this.renderProjects();

    this.reverseSortOrder = false;  // Add this line
    // Add the following lines
    const toggleSortButton = document.getElementById('toggle-sort');
    toggleSortButton.addEventListener('click', () => {
      this.reverseSortOrder = !this.reverseSortOrder;
      this.renderProjects();
    });

  }

  // Change your filteredProjects method to use this.reverseSortOrder
  filteredProjects() {
      let sortedProjects = this.projects
        .filter(this.applySearch.bind(this))
        .filter(this.applyFilters.bind(this))
        .filter(this.applyTags.bind(this))
        .sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));

      if (this.reverseSortOrder) {
        sortedProjects.reverse();
      }

      return sortedProjects;
    }


  addEventListeners () {
    const self = this;
    this.searchElement.on('input', event => this.updateSearch(event.target.value));
    this.filterElements.forEach(element => {
      element.find('input').change(function () {
        if (this.checked) self.addFilter(this.value);
        else self.removeFilter(this.value);
      });
    })
    this.tagsElement.on('change', event => this.updateTags(event.target.value));
    this.clearElement.on('click', () => this.clear());
  }

  addFilter (item) {
    const [filterName, value] = item.split('::');
    this.filters[filterName].push(value);
    this.renderProjects();
  }

  applySearch (project) {
    if (!this.search) return true;
    const { author, title, subtitle, tags } = project;
    if (title.toLowerCase().includes(this.search)) return true;
    if (subtitle.toLowerCase().includes(this.search)) return true;
    if (author.toLowerCase().includes(this.search)) return true;
    if (tags.some(tag => tag.toLowerCase().includes(this.search))) return true;
    return false;
  }

  applyFilters (project) {
    let passes = true;
    Object.keys(this.filters).forEach(key => {
      const filter = this.filters[key];
      if (filter.length) {
        if (!filter.includes(project[key])) {
          passes = false;
        }
      }
    });
    return passes;
  }

  applyTags (project) {
    if (!this.tags.length) return true;
    if (project.tags.some(tag => this.tags.includes(tag))) return true;
    return false;
  }

  clear () {
    this.tagsElement[0].selectize.clear();
    this.tags = [];
    this.filterElements.forEach(element => {
      element.find('input').attr('checked', false);
    });
    const newFilters = {};
    Object.keys(this.filters).forEach(key => newFilters[key] = []);
    this.filters = newFilters;
    this.renderProjects();
  }

  projectHtml (project) {
    const {
      author,
      date_posted,
      description,
      subtitle,
      tags,
      thumbnail,
      original_image,
      title,
      url,
    } = project;

    return `
      <div class="project-card">
        <a class="image-wrapper" href="${project.url}">
          <img id="thumbnailImage-${title}" src="${thumbnail || DEFAULT_THUMBNAIL }" 
          onerror="this.onerror=null; this.src='${original_image}'" />
          
        </a>
        <div class="card-content">
          <div class="card-title">

            <a href="${project.url}"><h1><strong>Title: </strong>${title}</h1></a>
            <h2><strong>Subtitle: </strong>${subtitle}</h2>

            <div class="card-container">
                <div class="card-child">
                    <strong>Author: </strong>${author}
                </div>
                <div class="card-child">
                    <strong>Date posted: </strong>${date_posted || '-'}
                </div>
            </div>
            </p>

          </div>
          <p class="card-description">${project.description}</p>
        </div>
        <div class="card-tags">
          <p>Tags:&nbsp;</p>
          ${
            tags
              .map(tag => `<span class="card-tag">${tag}</span>`)
              .join('')
          }
        </div>
      </div>
    `;
  }

  removeFilter (item) {
    const [filterName, value] = item.split('::');
    const options = this.filters[filterName];
    this.filters[filterName] = options.filter(option => option !== value);
    this.renderProjects();
  }

  renderProjects () {
    this.projectsElement.empty();
    this.filteredProjects().forEach(project => {
      this.projectsElement.append(this.projectHtml(project));
    });
  }

  updateSearch (searchString) {
    this.search = searchString.toLowerCase();
    this.renderProjects();
  }

  updateTags (tagsString) {
    this.tags = tagsString.split(',').filter(Boolean);
    this.renderProjects();
  }
}

Promise.all([
  fetch('{{site.baseurl}}/projects.json'),
  fetch('{{site.baseurl}}/filters.json'),
  fetch('{{site.baseurl}}/tags.json')
]).then(([
  projectsResponse,
  filtersResponse,
  tagsResponse
]) => {
  Promise.all([
    projectsResponse.json(),
    filtersResponse.json(),
    tagsResponse.json()
  ]).then(([
    projects,
    filterOptions,
    tagOptions
  ]) => {
    // initialize tag selector
    const tagsElement = $('#tags-selector').selectize({
      create: false,
      delimiter: ',',
      labelField: 'value',
      options: tagOptions.map(tag => ({ value: tag })),
      persist: false,
      searchField: ['value'],
      valueField: 'value',
    });

    new ProjectFilter({
      clearElement: $('#clear-project-filters'),
      filterElements: filterOptions.map(filter => $(`.project-filter.${filter.name}`)),
      filterOptions,
      projects: projects.map(project => ({ ...project, tags: project.tags.split(', ').filter(Boolean) })),
      projectsElement: $('.project-list'),
      searchElement: $('#project-search'),
      tagOptions,
      tagsElement,
    });

    // ability to toggle filter panel in/out
    const filterButton = $('.project-filter-button');
    filterButton.click(() => {
      if (filterButton.text() === 'Filter Projects') filterButton.text('Close Filters');
      else filterButton.text('Filter Projects');
      $('.project-filters').toggleClass('open');
      $('.projects-panel').toggleClass('filters-open');
    });
  });
});
