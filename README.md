# Company Regulations Management System

A modern web application for managing company regulations and policies with a clean, responsive interface.

## Features

- ✅ **Add Regulations**: Create new company regulations with a user-friendly modal
- ✅ **Edit Regulations**: Modify existing regulations in-place
- ✅ **Delete Regulations**: Remove regulations with confirmation dialog
- ✅ **Auto-numbering**: Regulations are automatically numbered and reordered
- ✅ **Data Persistence**: All data is stored in JSON files with automatic backups
- ✅ **Reset to Defaults**: Restore original regulations when needed
- ✅ **Responsive Design**: Works perfectly on desktop and mobile devices
- ✅ **Real-time Updates**: Changes are immediately reflected in the UI

## Screenshots

![Regulations Management Interface](https://via.placeholder.com/800x600/2563eb/ffffff?text=Regulations+Management+Interface)

## Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Data Storage**: JSON files
- **Styling**: Custom CSS with modern design principles

## Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/your-username/regulations-app.git
cd regulations-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/regulations` | Get all regulations |
| POST | `/api/regulations` | Create new regulation |
| PUT | `/api/regulations/:id` | Update regulation by ID |
| DELETE | `/api/regulations/:id` | Delete regulation by ID |
| POST | `/api/regulations/reset` | Reset to default regulations |
| POST | `/api/regulations/save` | Create backup of current regulations |

## Deployment

### Deploy to Railway

1. **Sign up** at [railway.app](https://railway.app)
2. **Connect GitHub** and select this repository
3. **Deploy** - Railway auto-detects Node.js and deploys
4. **Access** your app at the provided Railway URL

### Deploy to Render

1. **Sign up** at [render.com](https://render.com)
2. **Create Web Service** from GitHub repository
3. **Configure**:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Deploy** and access via Render URL

### Deploy to Heroku

1. **Install Heroku CLI**
2. **Login and create app**:
```bash
heroku login
heroku create your-app-name
```
3. **Deploy**:
```bash
git push heroku main
```

## Project Structure

```
regulations-app/
├── server.js              # Express server with API endpoints
├── package.json           # Dependencies and scripts
├── public/
│   └── index.html        # Frontend application
├── data/
│   └── regulations.json  # Data storage (auto-created)
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Usage

### Adding a Regulation
1. Click the **"+ Add Regulation"** button
2. Enter the regulation content in the modal
3. Click **"Add Regulation"** to save

### Editing a Regulation
1. Click the **"Edit"** button on any regulation
2. Modify the content in the modal
3. Click **"Save Changes"** to update

### Deleting a Regulation
1. Click the **"Delete"** button on any regulation
2. Confirm the deletion in the dialog
3. The regulation will be removed with a smooth animation

### Resetting to Defaults
1. Click **"Reset to Default"** in the bottom controls
2. Confirm the action to restore original regulations
3. All custom regulations will be replaced with defaults

## Data Storage

- Regulations are stored in `data/regulations.json`
- Automatic backups are created in `data/` with timestamps
- Data persists between server restarts
- JSON format makes it easy to migrate or backup manually

## Customization

### Styling
- All styles are in the `<style>` section of `index.html`
- Uses modern CSS with clean typography and smooth animations
- Fully responsive design with mobile-first approach

### Default Regulations
- Default regulations are defined in `server.js`
- Modify the `defaultRegulations` array to change initial content
- Run reset function to apply new defaults

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/regulations-app/issues) page
2. Create a new issue with detailed description
3. Include screenshots if applicable

## Roadmap

- [ ] User authentication and authorization
- [ ] Role-based access control
- [ ] Regulation categories and tags
- [ ] Search and filtering capabilities
- [ ] Export to PDF functionality
- [ ] Audit trail and change history
- [ ] Email notifications for changes
- [ ] Integration with company directories

---

Made with ❤️ for better workplace organization