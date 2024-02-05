$(document).ready(function () {

    // Gestisci l'evento di mouseenter sulla sidebar
    $('#sidebar').on('mouseenter', function () {
        if ($('#sidebar').hasClass('active')) {
            $('#sidebar').removeClass('active');
            //$('.arrow').addClass('arrow-rotated');
            $('#content').removeClass('active');
        }
    });

    // Gestisci l'evento di mouseleave sulla sidebar
    $('#sidebar').on('mouseleave', function () {
        if (!$('#sidebar').is(':hover')) {
            $('#sidebar').addClass('active');
            //$('.arrow').removeClass('arrow-rotated');
            $('#content').addClass('active');
        }
    });

    $('.more-button,.body-overlay').on('click', function () {
        $('#sidebar,.body-overlay').toggleClass('show-nav');
    });
});



/* Gestisci sidebar e content al click della freccia

// Controlla lo stato memorizzato in localStorage al caricamento della pagina
    var isSidebarCollapsed = localStorage.getItem('isSidebarCollapsed') === 'true';

    // Inizializza lo stato della sidebar
    $('#sidebar').toggleClass('active', isSidebarCollapsed);
    $('.arrow').toggleClass('arrow-rotated', isSidebarCollapsed);
    // Inizializza lo stato del content
    $('#content').toggleClass('active', isSidebarCollapsed);

    // Rimuovi la classe temporanea dal body
    $('body').css('display', 'block');


    // Gestisci l'evento di clic sul pulsante della sidebar
    $('#sidebarCollapse').on('click', function () {
        // Toggle della classe 'active' sulla sidebar
        $('#sidebar').toggleClass('active');
        // Toggle della classe 'active' su #content
        $('#content').toggleClass('active', $('#sidebar').hasClass('active'));

        // Toggle della classe 'arrow-rotated'
        $('.arrow').toggleClass('arrow-rotated');

        // Salva lo stato nella memoria locale
        localStorage.setItem('isSidebarCollapsed', $('#sidebar').hasClass('active'));
    });
*/