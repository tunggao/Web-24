window.onload = () => {
    let pageToken = '';
    let getVideoTimeout;
    let isLoadingMore = false;
    $(document).ready(function () {
        //$('#keyword').on('input', function (event)
        $('#search').on('submit', function (event) {
            event.preventDefault();
            $('.lds-hourglass').css('display', 'inline-block');
            const keyword = $('#keyword').val();
            $('#result-list').empty();
            //Throttle
            // if (!isThrottle) {
            //     isThrottle = true;
            //     getVideoItem(keyword);
            //     setTimeout(function () {
            //         isThrottle = false;
            //     }, 5 * 1000);
            // }


            //Debounce
            if (getVideoTimeout) clearTimeout(getVideoTimeout);
            getVideoTimeOut = setTimeout(function () {
                getVideoItem(keyword);
            }, 1000);

        })
        $('#window').on('scroll', function (event) {
            if ($(document).height() - ($(window).height() + $(window).scrollTop()) < 1000) {
                const keyword = $('#keyword').val();
                if (!isLoadingMore && pageToken != '') {
                    isLoadingMore = true;
                    getVideoItem(keyword);
                }
            }
        });
    });
    function getVideoItem(keyword) {
        $('.lds-hourglass').css('display', 'inline-block');

        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${pageToken || ''}`,
            type: 'GET',
            success: function (data) {
                if (data.items && data.items.length > 0) {
                    // for (let i = 0; data.items.length > 0; i++) {
                    //     $('#result-list').append(`
                    //     <a class="result col-md-12" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay = true" target="_blank">
                    //         <img src = "${data.items[i].snippet.thumbnails.high.url}" alt = "">
                    //         <div class="video_info">
                    //             <h2 class="title">${data.items[i].snippet.title}</h2>
                    //             <p class="description">${data.items[i].snippet.description}</p>
                    //             <span>View >></span>
                    //         </div>
                    //     </a> 
                    //     `);
                    // }
                    //using ForEach
                    // data.items.forEach(function (videoItem) {
                    //     $('#result-list').append(`
                    //         <a class="result col-md-12" href="https://www.youtube.com/watch?v=${videoItem.id.videoId}?autoplay = true" target="_blank">
                    //             <img src = "${videoItem.snippet.thumbnails.high.url}" alt = "">
                    //             <div class="video_info">
                    //                 <h2 class="title">${videoItem.snippet.title}</h2>
                    //                 <p class="description">${videoItem.snippet.description}</p>
                    //                 <span>View >></span>
                    //             </div>
                    //         </a> 
                    //     `);
                    // });
                    //using map
                    let videoListItem = data.items.map(function (videoItem) {
                        return `
                                <a class="result col-md-12" href="https://www.youtube.com/watch?v=${videoItem.id.videoId}?autoplay = true" target="_blank">
                                    <img src = "${videoItem.snippet.thumbnails.high.url}" alt = "">
                                    <div class="video_info">
                                        <h2 class="title">${videoItem.snippet.title}</h2>
                                        <p class="description">${videoItem.snippet.description}</p>
                                        <span>View >></span>
                                    </div>
                                </a> 
                            `
                    });
                    $('#result-list').append(videoListItem);
                    if (data.nextPageToken) pageToken = data.nextPageToken;
                    isLoadingMore = false;
                }

                if (items.length === 0 || !data.nextPageToken) {
                    pageToken = '';
                    $('#result-list').append('<h3>No more !!!</h3>');
                }
                $('.lds-hourglass').css('display', 'none');
            },
            error: function (error) {
                console.log(error);
                isLoadingMore = false;
                $('.lds-hourglass').css('display', 'none');
            }
        });
    }
}



