# GitHub Setup Guide

Follow these steps to push your QR Scan Hire app to GitHub.

## Step 1: Install Git

### For Windows:
1. Download Git from: https://git-scm.com/download/win
2. Run the installer
3. Use default settings (just click "Next" through the installation)
4. **Important**: Make sure "Git from the command line and also from 3rd-party software" is selected
5. Complete the installation

### Verify Installation:
Open PowerShell or Command Prompt and run:
```bash
git --version
```
You should see something like: `git version 2.x.x`

## Step 2: Configure Git (One-time setup)

Set your name and email (this will be used for all your commits):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "John Doe"
git config --global user.email "john.doe@example.com"
```

### Verify your configuration:
```bash
git config --global user.name
git config --global user.email
```

## Step 3: Create a GitHub Account (if you don't have one)

1. Go to https://github.com
2. Click "Sign up"
3. Create your account

## Step 4: Initialize Git Repository in Your Project

Open PowerShell or Command Prompt in your project folder:

```bash
cd "c:\Users\16041\OneDrive\Desktop\project\qr scan hire"
```

Then run these commands:

### Initialize Git:
```bash
git init
```

### Add all files:
```bash
git add .
```

### Make your first commit:
```bash
git commit -m "Initial commit: QR Scan Hire app"
```

## Step 5: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the **"+"** icon in the top right
3. Click **"New repository"**
4. Fill in:
   - **Repository name**: `qr-scan-hire` (or any name you like)
   - **Description**: "Job application system using QR codes"
   - **Visibility**: Choose Public or Private
   - **DO NOT** check "Initialize with README" (we already have files)
5. Click **"Create repository"**

## Step 6: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

### If you haven't committed yet:
```bash
git remote add origin https://github.com/YOUR_USERNAME/qr-scan-hire.git
git branch -M main
git push -u origin main
```

### If you already committed (which you did in Step 4):
```bash
git remote add origin https://github.com/YOUR_USERNAME/qr-scan-hire.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 7: Authentication

When you run `git push`, GitHub will ask for authentication:

### Option A: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "QR Scan Hire"
4. Select scopes: Check **"repo"** (this gives full repository access)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When Git asks for password, paste the token instead

### Option B: GitHub CLI (Alternative)
```bash
# Install GitHub CLI
winget install GitHub.cli

# Then authenticate
gh auth login
```

## Complete Command Sequence

Here's the complete sequence of commands to run (after installing Git):

```bash
# Navigate to your project
cd "c:\Users\16041\OneDrive\Desktop\project\qr scan hire"

# Initialize Git
git init

# Configure Git (one-time, if not done already)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: QR Scan Hire app"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/qr-scan-hire.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Troubleshooting

### "git is not recognized"
- Git is not installed or not in PATH
- Restart your terminal after installing Git
- Or reinstall Git and make sure to select "Git from the command line"

### "Authentication failed"
- Use a Personal Access Token instead of password
- Make sure you copied the entire token

### "Repository not found"
- Check that the repository name matches
- Make sure you created the repository on GitHub first
- Verify your GitHub username is correct

### "Permission denied"
- Make sure you're using the correct repository URL
- Check that you have access to the repository

## Next Steps After Pushing

Once your code is on GitHub:

1. **Deploy to Vercel**:
   - Go to https://vercel.com
   - Import your GitHub repository
   - Deploy!

2. **Update Admin Password**:
   - Change the password in `src/components/AdminLogin.jsx` before deploying

3. **Test Everything**:
   - Make sure all files are pushed
   - Check that the repository looks correct on GitHub

## Quick Reference

```bash
# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull
```

Good luck! 🚀

