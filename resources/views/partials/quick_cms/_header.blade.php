<!doctype html>
<html lang="it" data-bs-theme="auto">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    @if (env('APP_ENV') == 'production')
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    @endif
    <meta name="description" content="">
    <meta name="author" content="Vincenzo Designer">
    <meta name="generator" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Quick CMS</title>

    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>

    @routes
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/css/quick_cms/app.css', 'resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead

    {{-- <link rel="preload" as="script" href="https://cdn.iubenda.com/cs/iubenda_cs.js" />
    <link rel="preload" as="script" href="https://cdn.iubenda.com/cs/tcf/stub-v2.js" />
    <script src="https://cdn.iubenda.com/cs/tcf/stub-v2.js"></script>
    <script>
        (_iub = self._iub || []).csConfiguration = {
            cookiePolicyId: 61787884,
            siteId: 3516311,
            localConsentDomain: 'quickcms.altervista.org',
            timeoutLoadConfiguration: 30000,
            lang: 'it',
            enableTcf: true,
            tcfVersion: 2,
            tcfPurposes: {
                "2": "consent_only",
                "3": "consent_only",
                "4": "consent_only",
                "5": "consent_only",
                "6": "consent_only",
                "7": "consent_only",
                "8": "consent_only",
                "9": "consent_only",
                "10": "consent_only"
            },
            invalidateConsentWithoutLog: true,
            googleAdditionalConsentMode: true,
            consentOnContinuedBrowsing: false,
            banner: {
                position: "top",
                acceptButtonDisplay: true,
                customizeButtonDisplay: true,
                closeButtonDisplay: true,
                closeButtonRejects: true,
                fontSizeBody: "14px",
            },
        }
    </script>
    <script async src="https://cdn.iubenda.com/cs/iubenda_cs.js"></script> --}}
</head>
