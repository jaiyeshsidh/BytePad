<script>
import Vue from 'vue';
import Main from './main.js';

// console.log(Main.methods)

export default Main
</script>

<template>

 
        <div id="header">
            <div class="header-search-inner" >
                <div id="input-holder">
                    <div class="branding">
                        <img src="asset/images/bytepad-logo.png" class="img-responsive center-block">
                        <h1>Bytepad<p>Powered by SOFTWARE INCUBATOR</p></h1>
                    </div>
                    <div id="search-focus">
                        <!--input type="text" id="example" name="Search" placeholder="Enter Subject NAME or SUBJECT-CODE"-->
                        <autocomplete
                        :suggestions="subjects"
                        :selection.sync="value"
                        
                        ></autocomplete>
                        <!-- <div class="example">
                            <div class="search-filter">
                                <button id="active-filter">All</button>
                                <button>PUT</button>
                                <button>ST1</button>
                                <button>ST2</button>
                                <button>UT</button>
                                
                            </div>
                            <h6>Eg. Power Electronics or NAS-201 or Maths III</h6>
                        </div> -->
                    </div>
                </div>  
            </div>
        </div>


    <header>
        <div class="container help-546">
            <div class="row">
                <div class="col-sm-6 col-sm-push-6 help-546" >
                    <div class="header-content-right">
                        <h4 style="text-transform: uppercase; text-align: center;">Latest Update</h2>
                        <div class="alert alert-success fade in" id="updates">
                            <!-- <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> -->
                            <strong class="pull-left" style="padding-right:10px; border-right: 2px solid #fe2b65;">Updates</strong> PUTs Paper are available NOW
                        </div>
                        <div class="alert alert-success fade in" id="updates">
                            <!-- <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> -->
                            <strong class="pull-left" style="padding-right:10px; border-right: 2px solid #fe2b65;">Updates</strong> Solution Papers are also Updated
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-sm-pull-6 " >
                    <div class="header-content-left">
                        <div class="header-content-inner">
                            <p >Making efforts in the right direction reaps fruit. Bytepad maximises your effort and helps you to score better. Working smart is as important as working hard. You can search and download previous year Question papers with solutions which can increase your score in exams. You can search ST, PUT, and UT papers of previous year of all branches. As the solutions are provided by the faculties of the college, hence they are authentic and reliable.</p>
                            <a href="#explore" class="btn btn-outline btn-xl page-scroll center-block" id="search">EXPLORE BYTEPAD MORE ...</a>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </header>
    


   <div id="dark-line">
   		<h1 id="explore"><span style="color: #fe2b65;">BytePad</span> IN EVEry exam</h1>
   </div>

    <section id="download" class="download bg-primary text-center">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h2>Discover the Power of <span>BYTEPAD</span></h2>
                    <p>Our app is available on any mobile device! Download now to get started!</p>
                    <hr>
                    <div class="download-badge">
                        <img src="asset/images/google-play-badge.svg">
                    	<img src="asset/images/app-store-badge.svg">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="features" class="features">
            <div class="container-fluid" id="features-container">
            	<div class="row">
                <div class="col-lg-12 text-center">
                    <div class="section-heading">
                        <h2>Unlimited Features, Unlimited Fun</h2>
                        <p class="text-muted">Check out how you can Score in Exams</p>
                        <hr>
                    </div>
                </div>
            </div>
            	<div class="col-sm-6 pad-off">
            		<div class="feature-block" id="mock-bytepad">
            			<div class="row">
            				<h6>Mob and Web APP</h6>
            				<h3>Download It. Anywhere.</h3>
            				<p>Donec semper urna dui, at vehicula orci imperdiet in. Duis vel aliquam eros, et venenatis nisl. Mauris dolor arcu, mattis in lacus faucibus, vestibulum volutpat mauris. Phasellus sodales turpis quis lectus suscipit blandit ut vel sem. </p>
            			</div>
            			<div class="row">
            				<!-- <img src="asset/images/mockup1.png" class="img-responsive"> -->
            			</div>
            		</div>
            	</div>
            	<div class="col-sm-6 pad-off">
            		<div class="feature-block">
            			<div class="row">
            				<h6>Keywords to your Subject</h6>
            				<h3>Search It. Read It.</h3>
            				<p>Get to know the important questions in just a few clicks? Go for Bytepad. Bytepad is a web application to look for previous year question paper for last minute preparation.</p>
            				<p class="hide-320">Donec semper urna dui, at vehicula orci imperdiet in. Duis vel aliquam eros, et venenatis nisl. Mauris dolor arcu, mattis in lacus faucibus, vestibulum volutpat mauris. Phasellus sodales turpis quis lectus suscipit blandit ut vel sem. Sed neque turpis, dapibus vel interdum nec, mollis sit amet metus. Sed ornare eleifend orci, in bibendum nulla pharetra id. Nam non leo laoreet, ornare neque id, sodales enim.</p>
            			</div>
            		</div>
            	</div>
            </div>
    </section>



	<div id="brightway">
   		<h5></h5>
   		<h1>Stop Hard. Start SMART.</h1>
   		<a href="#page-top" class="btn btn-outline btn-xl page-scroll" id="bytepad-btn">BytePad It</a>
   </div>


<!--    <div class="container-fluid" id="social-bar">
    <div class="row social-icon">
        <div style="font-size: 40px;text-align: center;">
            <h6 style="color: #fff; margin-top: 30px;">Connect Socially
                with Software Incubator</h6>
            <a href="https://www.facebook.com/RedefiningLimitations"
               target="_blank"><span
                    class="fa fa-facebook-square"></span></a>
            <a href="https://twitter.com/si_akgec" target="_blank"><span
                    class="fa fa-twitter-square"></span></a>
            <a href="https://github.com/Software-Incubator"
               target="_blank"><span
                    class="fa fa-github-square"></span></a>
            <a href="https://www.youtube.com/channel/UCamqzGM8e8nzsdi1bsoyaKw"
               target="_blank"><span
                    class="fa fa-youtube-play"></span></a>

        </div>
    </div>
</div> -->

    <footer>
        <div class="container">
            <p>&copy; 2016 BYTEPAD. <img src="asset/images/silogo.svg" class="img-responsive" id="svg-logo" style="display: inline; width: 40px;"> Developed and Designed By <a id="id-link" href="http://silive.in/" target="_blank">SOFTWARE INCUBATOR.</a> </p>
        </div>
    </footer>
</template>
