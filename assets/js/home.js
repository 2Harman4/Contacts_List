{
    $(document).ready(function(){

 
        const heading = $('#page-heading');
        const mainIcon = $('.main-icon');
        const leftDiv = $('#left-div');
        const changer = $('#changer');
        let deleteButtons = $('.delete-button');
        let form = $('#create-contact-form');
        const addContactIcon = $('.add-contact-icon');
      
        //in case a new contact is created, and its button to in array
        $('ul').change(function(){
            deleteButtons = $('.delete-button');
        })


        //animating the page and main icon----------------------------
        $(document).scroll(function(){

            if( $(document).scrollTop() >= 600){
                heading.css('filter','opacity(0)');
                mainIcon.css('filter','opacity(1)');
                mainIcon.addClass('move-icon');
                leftDiv.css('filter','opacity(1)');
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

        // ===================================================================
        // pressing the add contact icon will put the display of changer to block
        addContactIcon.click(function(){
            changer.toggleClass('visible invisible');

        });
    
        // --------------------CLicking on a Contact toggles class update-contact--------------

        let contactBar = $('.details');
       

        contactBar.click(function(event){
           
          
        });

    
            
       

    // ====================================================================
        // ajax for creating contact

    form.on('submit',function(event){
        
        event.preventDefault();
        console.log(form.serializeArray());

        let thisFormData =  form.serializeArray();

        $.ajax({
            url : '/create-contact',
            method : 'post',
            data:{
                'name' : thisFormData[0].value,
                'phone' : thisFormData[1].value
            },
            success: function(data){
                //lets see what comes from server
                console.log(data);

                // DIKSHA THIS ISN'T WORKING
                $.ajax({
                    url:'/', // THIS IS MY LANDING PAGE WHERE ALL THE CONTACTS ARE DISPLAYED
                    method:'get',
                    succes:function(){
                        console.log('********THE NEW CONTACT HAS BEEN ADDED TO THE LIST!!!!');
                    }, error: function(xhr, status, error){
                        console.log("error : ",error);
                        }
                });
            }
        });
    });
    // ==================================================================================




        // ------------------------------------------------------------
        // TRYING AJAX --- Deleting a contact

        deleteButtons.click(function(){

            let deleteIcon= $(this).children();
            console.log('lets see what this delete button holds: ');

            let uniqueId= deleteIcon.attr('data-uniqueId');
            
            console.log(uniqueId);
            
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