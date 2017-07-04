import cheerio from 'cheerio-without-node-native';

const OCW_URL = 'https://ocw.mit.edu/';

export default {
  Departments() {
    return fetch(`${OCW_URL}courses/all_departments.json`)
      .then(resp => resp.json(), err => console.error(err));
  },

  XDisciplinary() {
    return fetch(`${OCW_URL}courses/CrossDisciplinaryMaster.json`)
      .then(resp => resp.json(), err => console.error(err));
  },

  CourseList(department) {
    return fetch(`${OCW_URL}courses/${department}/${department}.json`)
      .then(resp => resp.json(), err => console.error(err))
      .then(courses => {
        return {
          department,
          courses,
        }
      });
  },

  ParsedFeature(url) {
    return fetch(`${url}`)
      .then(resp => resp.text())
      .then(html => {
        
        let formattedHTML = html
          .replace(/(\s\s)|\n|\t/g,'')
          .replace(/src\=/g, 'mit-src=')
          .match(/\<body.*\/body\>/)[0]
          .replace(/href="\//g, 'href="https://ocw.mit.edu/')
          .replace(/mit\-src\="\//g, 'src="https://ocw.mit.edu/');

        let $ = cheerio.load(formattedHTML);

        $('.help,.sc_nav,.sc_nav_bottom').remove();
        $('a').each(function() {
          $(this).attr('target', '_blank');
        });
        
        return $('#course_inner_section').html();

      });
  }
}