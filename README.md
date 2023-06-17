# Teachosm website code
This is the code repository for the TeachOSM website. 

# Site maintenance and update
This applies to only removing old modules & resources, modifying existing content. To upload, use the 'Add new project' from the top of the projects page. 

## To remove an old module:
1. Select 'master' as the working branch
2. Create and select a new branch from master using the format 'YYYY-MM-DD_<description>' 
3. Make changes directly in Github to the new branch. For example, delete the old module and click 'Commit' to commit the change to the new branch.
4. When finished making changes on the new branch, create a pull request TO master FROM your new branch.
5. Preview the changes, once Github has completed the update.
6. Merge the pull request once all checks are final

# development
For steps on running a local instance for development purposes, please see [CONTRIBUTING.md](CONTRIBUTING.md).

