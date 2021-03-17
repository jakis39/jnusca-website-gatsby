export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '60528c13435a7d1d41d1e703',
                  title: 'Sanity Studio',
                  name: 'jnusca-website-gatsby-studio',
                  apiId: '1cdaf048-4919-416b-8e03-e7c5711aa373'
                },
                {
                  buildHookId: '60528c13fab0d813c2ebb411',
                  title: 'Portfolio Website',
                  name: 'jnusca-website-gatsby',
                  apiId: 'd260a683-1d1c-4bb4-b712-8d5d561775fe'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/jakis39/jnusca-website-gatsby',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://jnusca-website-gatsby.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
