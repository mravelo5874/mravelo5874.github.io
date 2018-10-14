//Damage calc
function playerDamageCalc(taker, dealer, dealerWeight){
	// 0 for paper, 1 is rock, 2 is scissor, 3 dash, 4 is dodge, 5 for invulnerable
	//double damage for super effective
	//half for ineffective
	//class is 0 for light 1 for heavy
	//3 is dash (not yet implemented)
	var usualDam = 0;
	if (taker == 3){
		if(dealer == 2){
			return 3;
		}
		else{
			return 0;
		}
	}
	if(taker == 0){//paper
		if(dealerWeight){
			usualDam = 2;
		}
		else{
			usualDam = 1.5;
		}
		if(dealer == 0){
			return usualDam;
		}
		if(dealer == 1){
			return (usualDam/2);
		}
		if(dealer == 2){
			return (usualDam*2);
		}

	}
	if(taker == 1){//rock
		if(dealerWeight){
			usualDam = 1;
		}
		else{
			usualDam = 0.5;
		}
		if(dealer == 0){
			return (usualDam*2);
		}
		if(dealer == 1){
			return usualDam;
		}
		if(dealer == 2){
			return (usualDam/2);
		}

	}

	if(taker == 2){//scissors
		if(dealerWeight){
			usualDam = 1.5;
		}
		else{
			usualDam = 1;
		}
		if(dealer == 0){
			return (usualDam/2);
		}
		if(dealer == 1){
			return (usualDam*2);
		}
		if(dealer == 2){
			return usualDam;
		}

	}

	if(taker == 5 || taker == 4 || dealer == 4){//invulnerable
		return 0;
	}

	if(dealer == 5){
		if(dealerWeight > 0){
			return dealerWeight;
		}
		else{
			return 0;
		}
	}	