//Color Codes Notams Prototype

function colorCodesEASA(inputArray){
	//QMRLC => RUNWAY CLOSED
	if(inputArray.qcode.rawObject == "MR"){
		if(inputArray.qcode.rawAttribute == "LC"){
			return "text-danger";
		}else{
			return "text-warning";
		}
	}
	//QIGAS => GLIDE PATH (ILS)	UNSERVICEABLE
	if(inputArray.qcode.rawObject == "IG"){
		if(inputArray.qcode.rawAttribute == "AS"){
			return "text-danger";
		}else{
			return "text-warning";
		}
	}
	//QPUCH => MISSED APPROACH PROCEDURE CHANGED
	if(inputArray.qcode.rawObject == "PU"){
		if(inputArray.qcode.rawAttribute == "CH"){
			return "text-danger";
		}else{
			return "text-warning";
		}
	}
	//QPICH => INSTRUMENT APPROACH PROCEDURE CHANGED
	if(inputArray.qcode.rawObject == "PI"){
		if(inputArray.qcode.rawAttribute == "CH"){
			return "text-primary";
		}else{
			return "text-warning";
		}
	}
	//QPDCH => STANDARD INSTRUMENT DEPARTURE (SID) CHANGED
	if(inputArray.qcode.rawObject == "PD"){
		if(inputArray.qcode.rawAttribute == "CH"){
			return "text-primary";
		}else{
			return "text-warning";
		}
	}
	//QPACH => STANDARD INSTRUMENT ARRIVAL (STAR) CHANGED
	if(inputArray.qcode.rawObject == "PA"){
		if(inputArray.qcode.rawAttribute == "CH"){
			return "text-primary";
		}else{
			return "text-warning";
		}
	}
	//QXXCF => FREQUENCY CHANGED
	if(inputArray.qcode.rawAttribute == "CF"){
		return "text-success";
	}
	//QXXAS => UNSERVICEABLE
	if(inputArray.qcode.rawAttribute == "AS"){
		return "text-warning";
	}
}


function colorCodesFAA(inputArray){
	//RUNWAY CLOSED
	if(inputArray.details.condition == "Closed"){
		if(inputArray.details.keyword == "Runway"){
			return "text-danger";
		}else{
			return "text-warning";
		}
	}
	//GLIDE PATH (ILS) UNSERVICEABLE
	if(inputArray.details.condition == "OUT OF SERVICE"){
		if(inputArray.details.keyword == "Navigation"){
			return "text-danger";
		}else{
			return "text-warning";
		}
	}
	//MISSED APPROACH PROCEDURE CHANGED
	if(inputArray.qcode.rawObject == "PU"){
		if(inputArray.qcode.rawObject == "PU" && inputArray.qcode.rawAttribute == "CH"){
			return "text-danger";
		}else{
			return "text-warning";
		}
	}
	//INSTRUMENT APPROACH PROCEDURE CHANGED
	if(inputArray.qcode.rawObject == "PI"){
		if(inputArray.qcode.rawObject == "PI" && inputArray.qcode.rawAttribute == "CH"){
			return "text-primary";
		}else{
			return "text-warning";
		}
	}
	//STANDARD INSTRUMENT DEPARTURE (SID) CHANGED
	if(inputArray.qcode.rawObject == "PD"){
		if(inputArray.qcode.rawObject == "PD" && inputArray.qcode.rawAttribute == "CH"){
			return "text-primary";
		}else{
			return "text-warning";
		}
	}
	//STANDARD INSTRUMENT ARRIVAL (STAR) CHANGED
	if(inputArray.qcode.rawObject == "PA"){
		if(inputArray.qcode.rawObject == "PA" && inputArray.qcode.rawAttribute == "CH"){
			return "text-primary";
		}else{
			return "text-warning";
		}
	}
	//FREQUENCY CHANGED
	if(inputArray.qcode.rawAttribute == "CF"){
		return "text-success";
	}
	//UNSERVICEABLE
	if(inputArray.qcode.rawAttribute == "AS"){
		return "text-warning";
	}
}