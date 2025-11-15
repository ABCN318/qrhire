# How to Push to GitHub - Quick Guide

## The Problem
Git is trying to use cached credentials from a different GitHub account (`sajjadmsa`) instead of your account (`ABCN318`).

## Solution: Use a Personal Access Token

### Step 1: Create a Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `qrhire-push`
4. Select expiration: Choose how long you want it to last (or "No expiration" for convenience)
5. **Check the "repo" scope** (this gives full repository access)
6. Click **"Generate token"** at the bottom
7. **COPY THE TOKEN IMMEDIATELY** - you won't see it again!

### Step 2: Use the Token to Push

**Option A: Push and enter token when prompted**
```bash
git push -u origin main
```
When it asks for password, paste your token (not your GitHub password).

**Option B: Use token in URL (one-time)**
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/ABCN318/qrhire.git
git push -u origin main
```
Replace `YOUR_TOKEN` with the token you copied.

**Option C: Use token in URL (temporary, more secure)**
```bash
git push https://YOUR_TOKEN@github.com/ABCN318/qrhire.git main
```
This doesn't save the token permanently.

### Step 3: After Successful Push
Once it works, you can reset the remote URL:
```bash
git remote set-url origin https://github.com/ABCN318/qrhire.git
```

## Alternative: Use SSH (More Secure Long-term)

If you prefer SSH:

1. Generate SSH key (if you don't have one):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. Add SSH key to GitHub:
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key" and paste it

3. Change remote to SSH:
```bash
git remote set-url origin git@github.com:ABCN318/qrhire.git
git push -u origin main
```

## Your Changes Are Ready!
All your code changes are already committed locally. You just need to authenticate to push them!

