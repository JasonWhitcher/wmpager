const WMP_PAGE_LIST = [
    ['Organics - male - en',
     'wm-organics-male-en.mp3',
     'wm-organics-male-en.wav',
     'wm-organics-male-en.ogg'],
    ['Organics - female - en',
     'wm-organics-female-en.mp3',
     'wm-organics-female-en.wav',
     'wm-organics-female-en.ogg'],
    ['Trash - male - en',
     'wm-trash-male-en.mp3',
     'wm-trash-male-en.wav',
     'wm-trash-male-en.ogg'],
    ['Trash - female - en',
     'wm-trash-female-en.mp3',
     'wm-trash-female-en.wav',
     'wm-trash-female-en.ogg']
];

window.onload = function(){
	wmp_display_page_list(WMP_PAGE_LIST);

    var wmp_audio_list_options = document.getElementsByClassName('wmp-audio-item');
    
    for (var x = 0; x < wmp_audio_list_options.length; x++) {
    	wmp_audio_list_options[x].addEventListener('click', function(){
            wmp_check_and_select_audio_item(wmp_audio_list_options, this);
        });
    }

    /* Register Service Worker */
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(){console.log('Service Worker Registered');});
    }
};

function wmp_display_page_list(wmp_list){
    var wmp_html_audio_list = '';
    var wmp_audio_list_element = document.getElementById('wmp-audio-list');
    for(var x = 0; x < WMP_PAGE_LIST.length; x++){
    	wmp_html_audio_list += '<div id="wmp-audio-list-item">';
    	wmp_html_audio_list +=   '<input id="wmp-audio-list-radio-button-' + x + '" class="wmp-audio-item" type="radio" name="group1" value="' + wmp_list[x][0] + '" data-id="' + x + '">';
    	wmp_html_audio_list +=   '<span id="wmp-audio-list-radio-button-custom-' + x + '" class="wmp-radio-outer">';
    	wmp_html_audio_list +=    '<span class="wmp-radio-inner wmp-radio-unselected"></span>';
    	wmp_html_audio_list +=   '</span>';
    	wmp_html_audio_list +=   '<label for="wmp-audio-list-radio-button-' + x + '">' + wmp_list[x][0] +'</label>';
    	wmp_html_audio_list += '</div>';
    }
    wmp_audio_list_element.innerHTML = wmp_html_audio_list;
}

function wmp_check_and_select_audio_item(wmp_audio_elements, wmp_audio_element) {
    var wmp_element_id = wmp_audio_element.dataset.id; // Get the data-id attribute from the input element. This will correspond to the index of the array of audio sources.
    var wmp_element_to_test = wmp_audio_element.parentNode.getElementsByClassName('wmp-radio-outer')[0].getElementsByClassName('wmp-radio-inner')[0];
    if (wmp_element_to_test.classList.contains('wmp-radio-unselected')) {
        for (var y = 0; y < wmp_audio_elements.length; y++) {
            var wmp_audio_list_option = wmp_audio_elements[y].parentNode.getElementsByClassName('wmp-radio-outer')[0].getElementsByClassName('wmp-radio-inner')[0];
            wmp_audio_list_option.classList.remove('wmp-radio-selected');
            wmp_audio_list_option.classList.add('wmp-radio-unselected');
        }
        var wmp_radio_inner_element = wmp_audio_element.parentNode.getElementsByClassName('wmp-radio-outer')[0].getElementsByClassName('wmp-radio-inner')[0];
        wmp_radio_inner_element.classList.remove('wmp-radio-unselected');
        wmp_radio_inner_element.classList.add('wmp-radio-selected');
        wmp_change_audio_source(wmp_element_id); // Update the audio source files.
    } else {
        
    }
    
}

function wmp_change_audio_source(wmp_source_index) {
    //console.log('wmp:' + wmp_source_index);
    var wmp_html_source = '';
    var wmp_source_list = WMP_PAGE_LIST[wmp_source_index];
    var wmp_audio_element = document.getElementById('wmp-audio-player-container');
    wmp_html_source += '<audio controls>';
    wmp_html_source +=   '<source src="audio/' + wmp_source_list[1] + '" type="audio/mpeg">';
    wmp_html_source +=   '<source src="audio/' + wmp_source_list[2] + '" type="audio/wav">';
    wmp_html_source +=   '<source src="audio/' + wmp_source_list[3] + '" type="audio/ogg">';
    wmp_html_source += '</audio>';
    //console.log('wmp:' + wmp_html_source);
    // Add the audio sources to the audio element.
    wmp_audio_element.innerHTML = ''; // Clear any existing audio sources.
    wmp_audio_element.innerHTML = wmp_html_source;
}