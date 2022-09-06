<?php
    $page = 'trainer';
    $title = 'Pilot Brain Trainer Test';
    include '../assets/layout/header.php'; ?>

<script defer src="./trainer.js"></script>

	  	<h1 class="text-center">Pilot Brain Trainer</h1>
	  	<div class="card" id="screenSize">
	     
	      <div class="card-header">
	        
	          <div class="row">
	            <div class="col-6 px-0"><h3 class="mx-1" style="text-align:right;" id="first_display"></h3></div>
	            <span class="col-3 bg-white rounded px-0"><h3 class="text-center" id="second_display"></h3></span>
	            <div class="col-3 px-0"><h3 id="third_display" class="mx-1"></h3></div>
	          </div>

	          <div class="text-center">
            	<p id="hint" class="text-warning"></p>
              </div>

	      </div>

	      <div class="card-body">

	          <div class="text-center">

	          	<div class="d-flex flex-column">
					<button id="btn1" class="btn btn-primary btn-lg btn-block mb-3" type="button">Button</button>
					<button id="btn2" class="btn btn-primary btn-lg btn-block my-3" type="button">Button</button>
					<button id="btn3" class="btn btn-primary btn-lg btn-block my-3" type="button">Button</button>
					<button id="btn4" class="btn btn-primary btn-lg btn-block mt-3" type="button">Button</button>
				</div>

	          </div>
	      </div>

	      <div class="card-footer text-muted">

	      	<div class="row mb-3">
	          <div class="col text-center">
	            <button id="reset" class="btn btn-danger" type="button">
	              <i class="fas fa-redo"></i>
	            </button>
	          </div>
	          <div class="col text-center">
	            <button id="hintButton" class="btn btn-warning" type="button">
	              <i class="fas fa-question"></i>
	            </button>
	          </div>
	          <div class="col text-center">
	            <button id="next" class="btn btn-success" type="button">
	              <i class="fas fa-chevron-right"></i>
	            </button>
	          </div>
	        </div>

	        <div class="progress">
	          <div id="progress" class="progress-bar progress-bar-striped" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
	        </div>
	        <p id="footer_display" class="text-center my-1"></p>
	      </div>

	    </div>


	    <!-- Modal Score & Restart -->
	    <div class="modal fade" id="restartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	      <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	          <div class="modal-header">
	            <h5 class="modal-title" id="exampleModalLabel">Your Score</h5>
	          </div>
	          <div class="modal-body">
	            <p id="score_display"></p>
	          </div>
	          <div class="modal-footer">
	            <button id="questions" type="button" class="btn btn-secondary" data-dismiss="modal">Choose Questions</button>
	            <button id="restart" type="button" class="btn btn-primary" data-dismiss="modal">Restart</button>
	          </div>
	        </div>
	      </div>
	    </div>

	    <!-- Modal Startup -->
	    <div class="modal fade" id="startModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	      <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	          <div class="modal-header">
	            <h5 class="modal-title" id="exampleModalLabel">Start</h5>
	          </div>
	          <div class="modal-body">
	            
	            <div class="form-check">
	              <input class="form-check-input" type="radio" name="GroupRadio" value="20" checked>
	              <label class="form-check-label" for="radio1">
	                20 Questions
	              </label>
	            </div>
	            <div class="form-check">
	              <input class="form-check-input" type="radio" name="GroupRadio" value="50">
	              <label class="form-check-label" for="radio2">
	                50 Questions
	              </label>
	            </div>
	            <div class="form-check">
	              <input class="form-check-input" type="radio" name="GroupRadio" value="costum">
	              <label class="form-check-label" for="radio3">
	                  <input id="startInput" type="text" class="form-control" placeholder="Costum" disabled>
	              </label>
	            </div>

	            <div class="form-check">
	              <input class="form-check-input" type="radio" name="GroupRadio1" id="optionConversion" checked>
	              <label class="form-check-label" for="optionConversion">Conversions</label>
	            </div>
	            <div class="form-check">
	              <input class="form-check-input" type="radio" name="GroupRadio1" id="optionTime" disabled>
	              <label class="form-check-label" for="optionTime">Times</label>
	            </div>
	            <div class="form-check">
	              <input class="form-check-input" type="radio" name="GroupRadio1" id="optionBasics" disabled>
	              <label class="form-check-label" for="optionBasics">Basics</label>
	            </div>
	             <div class="form-check">
	              <input class="form-check-input" type="radio" name="GroupRadio1" id="optionHeadings">
	              <label class="form-check-label" for="optionBasics">Headings</label>
	            </div>

	          </div>
	          <div class="modal-footer">
	            <button id="start" type="button" class="btn btn-primary" data-dismiss="modal">Start</button>
	          </div>
	        </div>
	      </div>
	    </div>

<?php include '../assets/layout/footer.php'; ?>
