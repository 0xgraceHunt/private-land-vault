# Vercel Deployment Guide for Private Land Vault

This guide provides step-by-step instructions for deploying the Private Land Vault application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment

### 1. Prepare the Repository

Ensure all changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub repositories

### 3. Import Project

1. In your Vercel dashboard, click "New Project"
2. Find and select the `0xgraceHunt/private-land-vault` repository
3. Click "Import"

### 4. Configure Build Settings

Vercel should auto-detect the project as a Vite React app. Verify these settings:

- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 5. Set Environment Variables

In the Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

**Important**: Replace the placeholder values with your actual API keys:
- Get your Infura API key from [infura.io](https://infura.io)
- Get your WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)

**Steps to add environment variables:**
1. Go to your project dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in the sidebar
4. Add each variable with the values above
5. Make sure to select "Production", "Preview", and "Development" for each variable

### 6. Deploy

1. Click "Deploy" button
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### 7. Custom Domain (Optional)

To set up a custom domain:

1. Go to your project dashboard
2. Click "Settings" tab
3. Click "Domains" in the sidebar
4. Add your custom domain
5. Follow the DNS configuration instructions

## Build Configuration

Create a `vercel.json` file in the root directory for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Environment-Specific Deployments

### Production Deployment

- Use the main branch for production
- All environment variables should be set
- Custom domain can be configured

### Preview Deployments

- Automatic preview deployments for pull requests
- Uses the same environment variables as production
- Perfect for testing before merging

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are in `package.json`
2. **Environment Variables Not Working**: Ensure they start with `NEXT_PUBLIC_`
3. **Wallet Connection Issues**: Verify WalletConnect project ID is correct
4. **Contract Interaction Fails**: Check that the contract address is correct

### Build Logs

To view build logs:
1. Go to your project dashboard
2. Click on the deployment
3. View the "Build Logs" tab

### Local Testing

Test the build locally before deploying:

```bash
npm install
npm run build
npm run preview
```

## Performance Optimization

### Vercel Analytics

Enable Vercel Analytics for performance monitoring:
1. Go to project settings
2. Enable "Vercel Analytics"
3. View performance metrics in the dashboard

### Edge Functions

For advanced use cases, consider using Vercel Edge Functions for:
- API routes
- Server-side rendering
- Custom middleware

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to the repository
2. **API Keys**: Use Vercel's environment variable system
3. **CORS**: Configure CORS settings for your domain
4. **Rate Limiting**: Consider implementing rate limiting for API calls

## Monitoring and Maintenance

### Health Checks

Set up health checks for your application:
1. Create a simple health endpoint
2. Monitor uptime and performance
3. Set up alerts for failures

### Updates

To update your deployment:
1. Push changes to the main branch
2. Vercel will automatically redeploy
3. Monitor the deployment status

## Support

For issues with Vercel deployment:
- Check Vercel documentation
- Review build logs
- Contact Vercel support if needed

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment Best Practices](https://create-react-app.dev/docs/deployment/)

---

**Note**: This deployment guide assumes you have the necessary permissions and access to the GitHub repository and Vercel account.
