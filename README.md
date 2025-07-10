# 📝 Prompt Template Manager

A responsive single-page web application for creating and managing prompt templates with dynamic placeholders. Built with HTML, JavaScript, Tailwind CSS, and PHP backend for data persistence.

## ✨ Features

- **📝 Template Management**: Add, view, and delete prompt templates
- **🔄 Dynamic Placeholders**: 
  - `{today}` - Automatically replaced with current date (e.g., "4 July 2025")
  - `{input}` - User input via modal popup
- **📋 Copy to Clipboard**: Process templates and copy to clipboard with one click
- **💾 Data Persistence**: Templates saved in localStorage and server-side JSON
- **📱 Responsive Design**: Works perfectly on mobile and desktop
- **📤 Import/Export**: Export prompts to JSON and import from JSON files
- **🎨 Modern UI**: Beautiful interface built with Tailwind CSS

## 🚀 Quick Start

### Option 1: Local Development (No Server Required)
1. Simply open `index.html` in your web browser
2. The app will work with localStorage for data persistence
3. All features except server-side JSON storage will be available

### Option 2: With PHP Server (Full Features)
1. **Setup PHP Server**:
   ```bash
   # If you have PHP installed locally
   php -S localhost:8000
   
   # Or use XAMPP, WAMP, or any PHP server
   ```
2. **Access the application**: Open `http://localhost:8000` in your browser
3. **Server-side features**: Prompts will be saved to `prompts.json` on the server

## 📋 Usage Examples

### Basic Template
```
Dear {input}, your meeting is scheduled for {today}.
```
- `{input}` → User enters: "John"
- `{today}` → Automatically becomes: "4 July 2025"
- **Result**: "Dear John, your meeting is scheduled for 4 July 2025."

### Multiple Inputs
```
Hello {input}, please review the {input} document by {today}.
```
- First `{input}` → User enters: "Sarah"
- Second `{input}` → User enters: "quarterly report"
- `{today}` → Automatically becomes: "4 July 2025"
- **Result**: "Hello Sarah, please review the quarterly report document by 4 July 2025."

## 🛠️ Technical Details

### Frontend
- **HTML5**: Semantic markup with responsive design
- **JavaScript (ES6+)**: Vanilla JS with modern features
- **Tailwind CSS**: Utility-first CSS framework for styling
- **localStorage**: Client-side data persistence

### Backend (Optional)
- **PHP**: Server-side JSON file handling
- **JSON**: Data storage format
- **CORS**: Cross-origin resource sharing enabled

### Browser Support
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📁 File Structure

```
DeptoMyPrompt/
├── index.html          # Main application page
├── script.js           # JavaScript functionality
├── save_prompts.php    # PHP endpoint for saving prompts
├── read_prompts.php    # PHP endpoint for reading prompts
├── prompts.json        # Server-side data storage (created automatically)
├── Requirement.md      # Original requirements document
└── README.md          # This file
```

## 🔧 Customization

### Adding New Placeholders
To add new placeholder types, modify the `processTemplate()` method in `script.js`:

```javascript
processTemplate(template, inputs) {
    let processed = template;
    
    // Existing placeholders
    processed = processed.replace(/\{today\}/g, dateStr);
    processed = processed.replace(/\{input\}/g, () => inputs[inputIndex++] || '');
    
    // Add new placeholder
    processed = processed.replace(/\{custom\}/g, 'your custom value');
    
    return processed;
}
```

### Styling Changes
The application uses Tailwind CSS classes. You can customize the appearance by:
1. Modifying the Tailwind config in `index.html`
2. Adding custom CSS classes
3. Replacing Tailwind classes with your own styles

## 🧪 Testing

### Manual Testing Checklist
- [ ] Add a new prompt template
- [ ] Test `{today}` placeholder replacement
- [ ] Test single `{input}` placeholder
- [ ] Test multiple `{input}` placeholders
- [ ] Copy processed text to clipboard
- [ ] Delete a prompt template
- [ ] Export prompts to JSON
- [ ] Import prompts from JSON
- [ ] Test responsive design on mobile
- [ ] Verify data persistence after page reload

### Browser Testing
- Test on different screen sizes
- Verify clipboard functionality
- Check localStorage persistence
- Test import/export features

## 🐛 Troubleshooting

### Common Issues

**Clipboard not working:**
- Ensure you're using HTTPS or localhost
- Some browsers require user interaction for clipboard access

**PHP server issues:**
- Check if PHP is installed and running
- Verify file permissions for `prompts.json`
- Check server logs for errors

**Import/Export not working:**
- Ensure JSON file format is correct
- Check browser console for errors
- Verify file permissions

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy Prompting! 🎉** 