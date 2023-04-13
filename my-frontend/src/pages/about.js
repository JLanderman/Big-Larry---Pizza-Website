import React from 'react';
const sampleText = `Sam’s Pizza & More is a small pizza shop in 
					Stockton that has served the community for about 
					ten years. The pizza shop has many different flavors 
					and toppings for the customer to choose from. In addition, 
					the shop features an extensive menu including fast food 
					items such as burgers, and a variety of fried foods such 
					as French fries, zucchini fries, chicken nuggets, cheese 
					stick, mini corn dog, burrito fries, and more. They also 
					offer rice bowls with chicken, beef, or pork.`;
const sampleText2 =`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
					Suspendisse sit amet lorem sit amet tellus condimentum 
					fermentum. Ut sagittis eget leo vel luctus. Fusce ornare 
					sem in magna eleifend, vitae eleifend lorem luctus. Praesent 
					ut lobortis tortor. Nulla purus nisi, tempor at porttitor a, 
					ullamcorper ac erat. Vestibulum vel ante fermentum nisl finibus 
					suscipit. Sed tempor, lorem scelerisque feugiat bibendum, ligula 
					nulla pellentesque risus, at sodales nisl ligula vitae leo. 
					Pellentesque interdum quam non nunc dapibus, nec bibendum tortor
					 molestie. In tincidunt et sem sed tincidunt. Praesent in sollicitudin 
					 quam, id pulvinar sem. Suspendisse potenti. Proin fringilla suscipit 
					 tellus at mollis. Sed condimentum turpis nec volutpat lacinia. Nunc
					  tortor erat, varius id nisl vel, tristique sagittis mauris. Quisque 
					  interdum metus lectus, vel vulputate dui faucibus vel. Pellentesque 
					  imperdiet velit tortor. Vivamus nec quam non tellus ultrices condimentum. 
					  Curabitur fringilla egestas massa in fermentum. Vivamus hendrerit, orci
					   faucibus interdum posuere`
					
const About = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: .8, padding: '5rem' }}>
	  	<u><h1 style={{ color: 'blue' }}>Sample information about Sam's Pizza:</h1></u>
        <h2>{sampleText}</h2>
		<em><h2>{sampleText2}</h2></em>
		<em><h2>{sampleText2}</h2></em>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', 
					height: '70vh', marginTop: '50px', marginBottom: '50px' }}>
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			{/*Sample images taken from client's facebook, and a screen shot of the location on google maps*/}
			{/*Sam's Pizza - Client's logo image has an annoying grey bar at the top*/}
			<img src="https://scontent.fmcc1-1.fna.fbcdn.net/v/t39.30808-6/221732769_318974389921029_6655959976331066938_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=19026a&_nc_ohc=ywZy4aMpUh8AX8GkPlJ&_nc_ht=scontent.fmcc1-1.fna&oh=00_AfCAz1BFjfSTFI38PWIO-YwjgdjVpsv5deOq6NXmDDxFVg&oe=643CE2D9" 
			alt="name" style={{ width: '400px', height: 'auto' }} />
			{/*Pizza Image*/}
			<img src="https://scontent.fmcc1-1.fna.fbcdn.net/v/t1.6435-9/116248562_3644038608969118_5945244553328221733_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=T8BfE6OS0fQAX8H95lO&_nc_ht=scontent.fmcc1-1.fna&oh=00_AfD5rKW4BTwwKfRII0RZ6hivUVhI0LyNzHUBAU4KX97MkA&oe=645ED1E0" 
			alt="pizza" style={{ width: '400px', height: 'auto' }} />
			{/*Google Maps Location*/}
			<img src="https://external.fmcc1-1.fna.fbcdn.net/static_map.php?v=2042&theme=default&ccb=4-4&size=544x250&language=en_US&scale=2&zoom=12&center=37.967126%2C-121.322487&marker_list[0]=37.967126%2C-121.322487&_nc_client_id=profile&_nc_client_caller=CometStaticMap.react" 
			alt="location" style={{ width: '400px', height: 'auto' }} />

		</div>
	</div>


    </div>
  );
};

export default About;
