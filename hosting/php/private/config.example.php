<?php
// Copy OUTSIDE public_html to /home/ACCOUNT/school-forms/config.php, mode 0600.
// Disabled until HTTPS, mail delivery, intake notice and synthetic tests pass.
return [
    'enabled' => false,
    'application_enabled' => false, // school privacy/retention approval required; contact independent
    'sender' => '', // verified permitted school sender, required before enabling
    'origins' => ['https://ntsonkothasec.school.za', 'https://www.ntsonkothasec.school.za'],
    'state_dir' => __DIR__ . '/state', // private, writable, mode 0700
    'rate_key' => '', // random 32+ bytes, provision locally on the host
];
