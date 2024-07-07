const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const database_id = process.env.NOTION_DATABASE_ID

module.exports = {
  getNotes: async function () {
    const payload = {
      path: `databases/${database_id}/query`,
      method: 'POST',
    }

    const { results } = await notion.request(payload)

    const notes = results.map((page) => {
      return {
        id: page.id,
        title: page.properties.Name.title[0].text.content,
        date: page.properties.Date.date.start,
        tags: page.properties.Tags.rich_text[0].text.content,
        description: page.properties.Description.rich_text[0].text.content,
      }
    })

    return notes
  },
  createNote: async function (title, tags, description) {
    const currentDate = new Date().toISOString();
    const payload = {
      path: 'pages',
      method: 'POST',
      body: {
        parent: { database_id: database_id },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: title,
                },
              },
            ],
          },
          Date: {
            date: {
              start: currentDate,
            },
          },
          Tags: {
            rich_text: [
              {
                text: {
                  content: tags,
                },
              },
            ],
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: description,
                },
              },
            ],
          },
        },
      },
    };

    try {
      const response = await notion.request(payload);
      return {
        id: response.id,
        title: title,
        tags: tags,
        description: description,
      };
    } catch (error) {
      console.error('Error creating note:', error.body);
      throw error;
    }
  },
  getNote: async function(id) {
    try {
      const response = await notion.pages.retrieve({ page_id: id });
      const note = {
        id: response.id,
        title: response.properties.Name.title[0].text.content,
        tags: response.properties.Tags.rich_text[0].text.content,
        description: response.properties.Description.rich_text[0].text.content,
      };
      return note;
    } catch (error) {
      console.error(`Failed to retrieve note with ID ${id}: ${error}`);
      throw error;
    }
  },
  updateNote: async function (id, title, tags, description) {
    const currentDate = new Date().toISOString();
    try {
      const response = await notion.pages.update({
        page_id: id,
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: title,
                },
              },
            ],
          },
          Date: {
            date: {
              start: currentDate,
            },
          },
          Tags: {
            rich_text: [
              {
                text: {
                  content: tags,
                },
              },
            ],
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: description,
                },
              },
            ],
          },
        },
      });
      return response;
    } catch (error) {
      console.error(`Failed to update note with ID ${id}: ${error}`);
      throw error; // Rethrow the error for further handling if necessary
    }
  },
  deleteNote: async function (id) {
    try {
      const response = await notion.pages.update({
        page_id: id,
        archived: true, // This marks the page as deleted (archived) in Notion
      });
      return response;
    } catch (error) {
      console.error(`Failed to delete note with ID ${id}: ${error}`);
      throw error; // Rethrow the error for further handling if necessary
    }
  },
};

