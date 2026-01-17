import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.coreexl.com',
                port: '',
                pathname: '/**',
            },
        ]
    },
    async rewrites() {
      return [
        // agentTransaction
        { source: '/advancepayment/:path*', destination: '/advancePayment/:path*' },
        { source: '/capscollection/:path*', destination: '/capsCollection/:path*' },
        { source: '/collection/:path*', destination: '/collection/:path*' },
        { source: '/distributorsdelivery/:path*', destination: '/distributorsDelivery/:path*' },
        { source: '/distributorsexchange/:path*', destination: '/distributorsExchange/:path*' },
        { source: '/distributorsinvoice/:path*', destination: '/distributorsInvoice/:path*' },
        { source: '/distributorsorder/:path*', destination: '/distributorsOrder/:path*' },
        { source: '/distributorsreturn/:path*', destination: '/distributorsReturn/:path*' },
        { source: '/newcustomer/:path*', destination: '/newCustomer/:path*' },
        { source: '/salesteamload/:path*', destination: '/salesTeamLoad/:path*' },
        { source: '/salesteamreconcile/:path*', destination: '/salesTeamReconcile/:path*' },
        { source: '/salesteamroutelinkage/:path*', destination: '/salesTeamRouteLinkage/:path*' },
        { source: '/salesteamtracking/:path*', destination: '/salesTeamTracking/:path*' },
        { source: '/salesteamunload/:path*', destination: '/salesTeamUnload/:path*' },
        { source: '/stocktransfer/:path*', destination: '/stocktransfer/:path*' },
        // assetsManagement
        { source: '/assetsmaster/:path*', destination: '/assetsMaster/:path*' },
        { source: '/assetsrequest/:path*', destination: '/assetsRequest/:path*' },
        { source: '/callregister/:path*', destination: '/callRegister/:path*' },
        { source: '/chillerinstallation/:path*', destination: '/chillerInstallation/:path*' },
        { source: '/fridgeupdatecustomer/:path*', destination: '/fridgeUpdateCustomer/:path*' },
        { source: '/serviceterritory/:path*', destination: '/serviceTerritory/:path*' },
        { source: '/servicevisit/:path*', destination: '/serviceVisit/:path*' },
        // claimManagement
        { source: '/compensationreport/:path*', destination: '/compensationReport/:path*' },
        { source: '/compiledclaims/:path*', destination: '/compiledClaims/:path*' },
        { source: '/petitclaim/:path*', destination: '/petitClaim/:path*' },
        // companyTransaction
        { source: '/caps/:path*', destination: '/caps/:path*' },
        { source: '/creditnote/:path*', destination: '/creditNote/:path*' },
        { source: '/delivery/:path*', destination: '/delivery/:path*' },
        { source: '/invoice/:path*', destination: '/invoice/:path*' },
        { source: '/order/:path*', destination: '/order/:path*' },
        { source: '/purchaseorder/:path*', destination: '/purchaseOrder/:path*' },
        { source: '/return/:path*', destination: '/return/:path*' },
        { source: '/sapintegration/:path*', destination: '/sapIntegration/:path*' },
        { source: '/tmpreturn/:path*', destination: '/tmpReturn/:path*' },
        // loyaltyProgram
        { source: '/customerloyaltypoints/:path*', destination: '/customerLoyaltyPoints/:path*' },
        { source: '/pointsadjustment/:path*', destination: '/pointsAdjustment/:path*' },
        // manageDistributors
        { source: '/distributors/:path*', destination: '/distributors/:path*' },
        { source: '/distributorsoverview/:path*', destination: '/distributorsOverview/:path*' },
        { source: '/distributorsstock/:path*', destination: '/distributorsStock/:path*' },
        // master
        { source: '/companycustomer/:path*', destination: '/companyCustomer/:path*' },
        { source: '/discount/:path*', destination: '/discount/:path*' },
        { source: '/fieldcustomer/:path*', destination: '/fieldCustomer/:path*' },
        { source: '/item/:path*', destination: '/item/:path*' },
        { source: '/pricing/:path*', destination: '/pricing/:path*' },
        { source: '/promotion/:path*', destination: '/promotion/:path*' },
        { source: '/route/:path*', destination: '/route/:path*' },
        { source: '/routetransfer/:path*', destination: '/routeTransfer/:path*' },
        { source: '/routevisit/:path*', destination: '/routeVisit/:path*' },
        { source: '/salesteam/:path*', destination: '/salesTeam/:path*' },
        { source: '/vehicle/:path*', destination: '/vehicle/:path*' },
        // merchandiser
        { source: '/campaign/:path*', destination: '/campaign/:path*' },
        { source: '/competitor/:path*', destination: '/competitor/:path*' },
        { source: '/complaintfeedback/:path*', destination: '/complaintFeedback/:path*' },
        { source: '/planogram/:path*', destination: '/planogram/:path*' },
        { source: '/planogramimage/:path*', destination: '/planogramImage/:path*' },
        { source: '/shelfdisplay/:path*', destination: '/shelfDisplay/:path*' },
        { source: '/stockinstore/:path*', destination: '/stockinstore/:path*' },
        { source: '/survey/:path*', destination: '/survey/:path*' },
        { source: '/surveyquestion/:path*', destination: '/surveyQuestion/:path*' },
        { source: '/view/:path*', destination: '/view/:path*' },
        // reports
        { source: '/customerreport/:path*', destination: '/customerReport/:path*' },
        { source: '/salesreportdashboard/:path*', destination: '/salesReportDashboard/:path*' },
        // alert
        { source: '/alert/:path*', destination: '/alert/:path*' },
        // harrisTransaction
        { source: '/customerorder/:path*', destination: '/customerOrder/:path*' },
        // profile
        { source: '/profile/:path*', destination: '/profile/:path*' },
        // settingProfile
        { source: '/settingprofile/:path*', destination: '/settingProfile/:path*' },
        // settings
        { source: '/settings/:path*', destination: '/settings/:path*' },
        // settingsdev
        { source: '/settingsdev/:path*', destination: '/settingsdev/:path*' },
        // data
        { source: '/data/:path*', destination: '/data/:path*' },
      ];
  },
};

export default nextConfig;
