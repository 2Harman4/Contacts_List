{
    $(document).ready(function(){

 
        const heading = $('#page-heading');
        const mainIcon = $('.main-icon');
        const leftDiv = $('#left-div');
        const headingHolder = $('#heading-holder');
        const changer = $('#changer');
        const changerHeading = $('#changer-heading');
        let deleteButtons = $('.delete-button');
        let form = $('#create-contact-form');
        const addContactIcon = $('.add-contact-icon');
        let saveChangesButton = $('#save-changes-button');
        let uniqueId;
        let contactListItem;        
    

      
        //in case a new contact is created, and its button to in array
        $('ul').change(function(){
            deleteButtons = $('.delete-button');
        });

        changer.on('click',function(e){
            e.stopPropagation();
        });

        //animating the page and main icon----------------------------
        $(document).scroll(function(){

            let scrollFactor= (headingHolder.innerHeight())/ ($(document).scrollTop() + .0001);
            
            if( scrollFactor >= 2.3){
                heading.css('filter','opacity(1)');
                mainIcon.css('filter','opacity(0)');
                
            }
        
            else if( scrollFactor >= 1.7){
                    heading.css('filter','opacity(0.5)');
                    mainIcon.css('filter','opacity(0)');
                    mainIcon.removeClass('move-icon');
            }
            else {
                heading.css('filter','opacity(0)');
                mainIcon.css('filter','opacity(1)');
                mainIcon.addClass('move-icon');
                leftDiv.css('filter','opacity(1)');
            }
        });

        // ===================================================================
        // pressing the add contact icon will put the display of changer to block
        //Layout for changer --create contact
        addContactIcon.on('click',function(){
            changer.toggleClass('visible invisible');

            //adding the changer heading
            changerHeading.html('<h1>Add Contact &nbsp;<i class="fas fa-pen"></i> </h1>')

            //emptying the input boxses if filled by update and not submitted
            $('#name-inputer').val("");
            $('#phone-inputer').val("");

            //adding a class creator to saveChangesButton 
            saveChangesButton.toggleClass('creator');


        });
                        //to handle the dynamically added elements
                        // addContactIcon.on('click','.new-li',function(){
                        //     changer.toggleClass('visible invisible');
                
                        //     //adding the changer heading
                        //     changerHeading.html('<h1>Add Contact &nbsp;<i class="fas fa-pen"></i> </h1>')
                
                        //     //emptying the input boxses if filled by update and not submitted
                        //     $('#name-inputer').val("");
                        //     $('#phone-inputer').val("");
                
                        //     //adding a class creator to saveChangesButton 
                        //     saveChangesButton.toggleClass('creator');
                
                
                        // });
        // ==================================================================================
               

        // Layout for Updating a Contact
        $('li').on('click',function(event){

            event.stopPropagation();

            contactListItem = $(this);
            let name = contactListItem.attr('data-name');
            let phone = contactListItem.attr('data-phone');
            //to be used by ajax
            uniqueId = contactListItem.attr('data-uniqueid');

            console.log("the item u selected has an id:***",uniqueId);

            //we need to make the changer visible if not
            if(changer.hasClass('invisible')){
                changer.toggleClass('invisible visible');
            }

            //adding the changer heading
            changerHeading.html(' <h1>Update Contact &nbsp;<i class="fas fa-user-edit"></i> </h1>')

            //adding name and phone number to the input boxes
            $('#name-inputer').val(name);
            $('#phone-inputer').val(phone);

            //need to remove the class creator if present
            saveChangesButton.removeClass('creator');

            //allset
        });

                                            //to hande dynamically added elements
                                            // $('li').on('click','.new-li',function(event){

                                            //     event.stopPropagation();
                                    
                                            //     contactListItem = $(this);
                                            //     let name = contactListItem.attr('data-name');
                                            //     let phone = contactListItem.attr('data-phone');
                                            //     //to be used by ajax
                                            //     uniqueId = contactListItem.attr('data-uniqueid');
                                    
                                            //     console.log("the item u selected has an id:***",uniqueId);
                                    
                                            //     //we need to make the changer visible if not
                                            //     if(changer.hasClass('invisible')){
                                            //         changer.toggleClass('invisible visible');
                                            //     }
                                    
                                            //     //adding the changer heading
                                            //     changerHeading.html(' <h1>Update Contact &nbsp;<i class="fas fa-user-edit"></i> </h1>')
                                    
                                            //     //adding name and phone number to the input boxes
                                            //     $('#name-inputer').val(name);
                                            //     $('#phone-inputer').val(phone);
                                    
                                            //     //need to remove the class creator if present
                                            //     saveChangesButton.removeClass('creator');
                                    
                                            //     //allset
                                            // });

    // ====================================================================
        // ajax for creating contact + UPDATING 

    form.on('submit',function(event){
        
        event.preventDefault();
        event.stopPropagation();
        let thisFormData =  form.serializeArray();

        //------------------CREATING NEW CONTACT
        if(saveChangesButton.hasClass('creator')){
         
            console.log('data from form to create: ',thisFormData);
  
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

                    //lets reflect he changes in display
                    $('ul').prepend(
                        `<li class="new-li" data-name="${thisFormData[0].value}" data-phone="${thisFormData[1].value}>" data-uniqueid="${uniqueId}">
                        <div class="details">
                            <p class="name">${thisFormData[0].value}</p>
                            <p class="phone-number">${thisFormData[1].value}</p>
                        </div>

                        <div class="delete-button">
                            <!-- using request.query  -->
                            <!-- request is sent via ajax -->  
                            <i class="fas fa-trash-alt delete-icon"  data-uniqueId="${uniqueId}"></i>
                        </div>
                    </li>`
                    )
                }
            });

            //the changer collapses on update
            changer.toggleClass('visible invisible');
        }else
        {
            //Update
            //-------------------now need to send request to server via ajax
        
        
            console.log("the data submitted to update by form includes:",thisFormData);
            //it contains array of objects with name and phone no
            //we need to pass the id too

            console.log("on saving changes lets see if the id is sent or not:",uniqueId);

            $.ajax({
                url : '/update-contact',
                method : 'post',
                data:{
                    'name' : thisFormData[0].value,
                    'phone' : thisFormData[1].value,
                    "id":uniqueId
                },
                success: function(data){
                    //checking
                    console.log(data);

                    //lets reflect changes in display---------------
                    contactListItem.replaceWith(
                        `<li class="new-li" data-name="${thisFormData[0].value}" data-phone="${thisFormData[1].value}>" data-uniqueid="${uniqueId}">
                            <div class="details">
                                <p class="name">${thisFormData[0].value}</p>
                                <p class="phone-number">${thisFormData[1].value}</p>
                            </div>

                            <div class="delete-button">
                                <!-- using request.query  -->
                                <!-- request is sent via ajax -->  
                                <i class="fas fa-trash-alt delete-icon"  data-uniqueId="${uniqueId}"></i>
                            </div>
                        </li>`
                    );

                  
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                  }
            });


            //the changer collapses on update
            changer.toggleClass('visible invisible');

        }
    });

        // ------------------------------------------------------------
        // TRYING AJAX --- Deleting a contact

        deleteButtons.on('click',function(event){

            event.stopPropagation();

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