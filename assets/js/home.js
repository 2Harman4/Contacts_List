{
    $(document).ready(function(){

 
        const heading = $('#page-heading');
        const mainIcon = $('.main-icon');
        let deleteButtons = $('.delete-button');

      
        //in case a new contact is created, and its button to in array
        $('ul').change(function(){
            deleteButtons = $('.delete-button');
        })

        $(document).scroll(function(){

            if( $(document).scrollTop() >= 600){
                heading.css('filter','opacity(0)');
                mainIcon.css('filter','opacity(1)');
                mainIcon.addClass('move-icon');
            }
        
            else if( $(document).scrollTop() >= 200){
                     heading.css('filter','opacity(0.5)');
                      mainIcon.css('filter','opacity(0)');
        
            }
            else{
                heading.css('filter','opacity(1)');
                mainIcon.css('filter','opacity(0)');
                mainIcon.removeClass('move-icon');
            }
        });

    

        // -----------------------zoom in and out of contacts--------------

        let contactBar = $('.details');
        let clicks = 0; //even

        contactBar.click(function(event){
            event.stopPropagation();
            // contactBar.css('font-size','1rem');
            clicks++;

            if(clicks % 2 !=0){

                let element = $(this);
                element.animate({
                    fontSize: '2rem'
                },500,'swing');
            }else{

                contactBar.css('font-size','1rem');
            } 
        });

        $('body').click(function(){
            clicks=0;
            contactBar.css('font-size','1rem');
            
        });

    // ====================================================================
























        // ------------------------------------------------------------
        // TRYING AJAX --- Deleting a contact

        deleteButtons.click(function(){

            let deleteIcon= $(this).children();
            console.log('lets see what this delete button holds: ');

            let name= deleteIcon.attr('data-name');
            let phone= deleteIcon.attr('data-phone');
            let uniqueId= deleteIcon.attr('data-uniqueId');
            
            console.log(name,phone,uniqueId);
            
            $.ajax({
                url:'/delete-contact',
                method: 'get',
                //this data is being sent as query params
                data: {
                    "id":uniqueId
                },
                success: function(data) {
                    
                   deleteIcon.parent().parent().remove();
                
                },
                error: function(jqXHR, textStatus, errorThrown) {
                         alert('error ' + textStatus + " " + errorThrown);
                }    
            });      
        });
    });
}