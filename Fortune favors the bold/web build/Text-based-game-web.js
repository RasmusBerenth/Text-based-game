importScripts('bridge.js', 'dotnetconsole.js', 'dotnetconsole.worker.js');
/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2022
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("Text-based-game-web", function ($asm, globals) {
    "use strict";

    Bridge.define("Text_based_game.Choice", {
        fields: {
            MinimumConfidence: 0,
            ConfidenceAlteration: 0,
            AlarmLevelAlteration: 0,
            EventRequirement: null,
            SpecialItemRequirement: null,
            SpecialItemGained: null,
            Narration: null,
            Name: null,
            NextEvent: null
        }
    });

    Bridge.define("Text_based_game.Ending", {
        fields: {
            Name: null,
            Narration: null,
            EventRequirements: null,
            MinimumConfidence: 0,
            MaximumConfidence: 0,
            MinimumAlarmLevel: 0,
            MaximumAlarmLevel: 0
        },
        ctors: {
            init: function () {
                this.MinimumConfidence = 0;
                this.MaximumConfidence = 2147483647;
                this.MinimumAlarmLevel = 0;
                this.MaximumAlarmLevel = 6;
            }
        }
    });

    Bridge.define("Text_based_game.Event", {
        fields: {
            Name: null,
            Narration: null,
            Choices: null
        }
    });

    Bridge.define("Text_based_game.Program", {
        main: function Main (args) {
            var $step = 0,
                $task1, 
                $taskResult1, 
                $task2, 
                $taskResult2, 
                $task3, 
                $taskResult3, 
                $task4, 
                $taskResult4, 
                $task5, 
                $taskResult5, 
                $task6, 
                $taskResult6, 
                $jumpFromFinally, 
                $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                $returnValue, 
                SetStartingState, 
                InitializeStringArrayParameter, 
                InitializeStringParameter, 
                InitializeIntegerParameter, 
                eventsPath, 
                eventsText, 
                eventGroups, 
                choicesPath, 
                choicesText, 
                choiceGroups, 
                endPath, 
                endText, 
                endGroups, 
                titleScreenPath, 
                titleScreen, 
                titleLines, 
                eventChoices, 
                choicesPerEvent, 
                $t, 
                choiceInfoText, 
                choiceInfo, 
                choice, 
                eventInfo, 
                newEvent, 
                $t1, 
                endGroup, 
                ending, 
                $t2, 
                line, 
                colorMatches, 
                $t3, 
                colorMatch, 
                titleColor, 
                color, 
                confidence, 
                alarmLevel, 
                currentEvent, 
                userInput, 
                intUserInput, 
                storyline, 
                inventory, 
                ending1, 
                keyInfo, 
                possibleChoices, 
                notPossibleChoices, 
                $t4, 
                choice1, 
                counter, 
                $t5, 
                choice2, 
                $t6, 
                choice3, 
                selectedChoice, 
                keyInfo1, 
                cheat, 
                $async_e, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            $step = System.Array.min([0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,19,22,23,24,25,26], $step);
                            switch ($step) {
                                case 0: {
                                    SetStartingState = null;
                                    InitializeStringArrayParameter = null;
                                    InitializeStringParameter = null;
                                    InitializeIntegerParameter = null;
                                    Console.clear();
                                    Console.cursorVisible = false;
                                    Console.windowWidth = 86;
                                    Console.windowHeight = 27;
                                    Console.bufferWidth = Console.windowWidth;
                                    Console.bufferHeight = Console.windowHeight;

                                    eventsPath = "Events.txt";
                                    eventsText = System.IO.File.ReadAllText(eventsPath);
                                    eventGroups = System.String.split(eventsText, System.Array.init(["\r\n\r\n"], System.String), null, 0);

                                    choicesPath = "Choices.txt";
                                    choicesText = System.IO.File.ReadAllText(choicesPath);
                                    choiceGroups = System.String.split(choicesText, System.Array.init(["\r\n\r\n\r\n"], System.String), null, 0);

                                    endPath = "Endings.txt";
                                    endText = System.IO.File.ReadAllText(endPath);
                                    endGroups = System.String.split(endText, System.Array.init(["\r\n\r\n"], System.String), null, 0);

                                    titleScreenPath = "Fortune favor the bold title screen.txt";
                                    titleScreen = System.IO.File.ReadAllText(titleScreenPath);
                                    titleLines = System.String.split(titleScreen, System.Array.init(["\r\n"], System.String), null, 0);







                                    InitializeIntegerParameter = function (parameter, text, regex) {
                                        var info = System.Text.RegularExpressions.Regex.match(text, regex);
                                        if (info.getSuccess()) {
                                            parameter.v = System.Int32.parse(info.getGroups().get(1).getValue());
                                        }
                                    };
                                    InitializeStringParameter = function (parameter, text, regex) {
                                        var info = System.Text.RegularExpressions.Regex.match(text, regex);
                                        if (info.getSuccess()) {
                                            parameter.v = info.getGroups().get(1).getValue();
                                        }
                                    };

                                    for (var eventIndex = 0; eventIndex < eventGroups.length; eventIndex = (eventIndex + 1) | 0) {
                                        eventChoices = new (System.Collections.Generic.List$1(Text_based_game.Choice)).ctor();
                                        choicesPerEvent = System.String.split(choiceGroups[System.Array.index(eventIndex, choiceGroups)], System.Array.init(["\r\n\r\n"], System.String), null, 0);

                                        $t = Bridge.getEnumerator(choicesPerEvent);
                                        try {
                                            while ($t.moveNext()) {
                                                choiceInfoText = $t.Current;
                                                choiceInfo = System.Text.RegularExpressions.Regex.match(choiceInfoText, "Name: (.*)\\r\\nNarration: (.*)\\r");

                                                choice = new Text_based_game.Choice();
                                                choice.Name = choiceInfo.getGroups().get(1).getValue();
                                                choice.Narration = choiceInfo.getGroups().get(2).getValue();

                                                InitializeIntegerParameter(Bridge.ref(choice, "ConfidenceAlteration"), choiceInfoText, "Confidence alteration: ([^\\r]*)");
                                                InitializeIntegerParameter(Bridge.ref(choice, "AlarmLevelAlteration"), choiceInfoText, "Alarm level alteration: ([^\\r]*)");
                                                InitializeIntegerParameter(Bridge.ref(choice, "MinimumConfidence"), choiceInfoText, "Minimum confidence: ([^\\r]*)");
                                                InitializeStringParameter(Bridge.ref(choice, "SpecialItemRequirement"), choiceInfoText, "Special item requirement: ([^\\r]*)");
                                                InitializeStringParameter(Bridge.ref(choice, "SpecialItemGained"), choiceInfoText, "Special item gained: ([^\\r]*)");
                                                InitializeStringParameter(Bridge.ref(choice, "EventRequirement"), choiceInfoText, "Event requriement: ([^\\r]*)");
                                                InitializeStringParameter(Bridge.ref(choice, "NextEvent"), choiceInfoText, "Next event: ([^\\r]*)");

                                                eventChoices.add(choice);
                                            }
                                        } finally {
                                            if (Bridge.is($t, System.IDisposable)) {
                                                $t.System$IDisposable$Dispose();
                                            }
                                        }

                                        eventInfo = System.Text.RegularExpressions.Regex.match(eventGroups[System.Array.index(eventIndex, eventGroups)], "Name: (.*)\\r\\nNarration: (.*)");

                                        newEvent = new Text_based_game.Event();
                                        newEvent.Name = eventInfo.getGroups().get(1).getValue();
                                        newEvent.Narration = eventInfo.getGroups().get(2).getValue();
                                        newEvent.Choices = eventChoices;
                                        Text_based_game.Program.events.add(newEvent);
                                    }
                                    InitializeStringArrayParameter = function (parameter, text, regex) {
                                        var info = System.Text.RegularExpressions.Regex.match(text, regex);
                                        if (info.getSuccess()) {
                                            parameter.v = System.String.split(info.getGroups().get(1).getValue(), System.Array.init([", "], System.String), null, 0);
                                        }
                                    };

                                    $t1 = Bridge.getEnumerator(endGroups);
                                    try {
                                        while ($t1.moveNext()) {
                                            endGroup = $t1.Current;
                                            ending = new Text_based_game.Ending();

                                            InitializeStringParameter(Bridge.ref(ending, "Name"), endGroup, "Name: ([^\\r]+)");
                                            InitializeStringParameter(Bridge.ref(ending, "Narration"), endGroup, "Narration: ([^\\r]+)");
                                            InitializeStringArrayParameter(Bridge.ref(ending, "EventRequirements"), endGroup, "Event requirement: ([^\\r]+)");
                                            InitializeIntegerParameter(Bridge.ref(ending, "MinimumConfidence"), endGroup, "Minimum confidence: ([^\\r]+)");
                                            InitializeIntegerParameter(Bridge.ref(ending, "MaximumConfidence"), endGroup, "Maximum confidence: ([^\\r]+)");
                                            InitializeIntegerParameter(Bridge.ref(ending, "MinimumAlarmLevel"), endGroup, "Minimum alarm level: ([^\\r]+)");
                                            InitializeIntegerParameter(Bridge.ref(ending, "MaximumAlarmLevel"), endGroup, "Maximum alarm level: ([^\\r]+)");

                                            Text_based_game.Program.endings.add(ending);
                                        }
                                    } finally {
                                        if (Bridge.is($t1, System.IDisposable)) {
                                            $t1.System$IDisposable$Dispose();
                                        }
                                    }


                                    $t2 = Bridge.getEnumerator(titleLines);
                                    try {
                                        while ($t2.moveNext()) {
                                            line = $t2.Current;
                                            colorMatches = System.Text.RegularExpressions.Regex.matches(line, "(?:\\*(\\d{1,2})\\*|^)(.*?)(?=\\*\\d{1,2}\\*|$)");
                                            $t3 = Bridge.getEnumerator(colorMatches);
                                            try {
                                                while ($t3.moveNext()) {
                                                    colorMatch = Bridge.cast($t3.Current, System.Text.RegularExpressions.Match);
                                                    if (colorMatch.getSuccess()) {
                                                        if (colorMatch.getGroups().get(1).getSuccess()) {
                                                            titleColor = System.Convert.toInt32(colorMatch.getGroups().get(1).getValue());
                                                            color = titleColor;
                                                            Console.foregroundColor = color;
                                                        }
                                                        Console.write(colorMatch.getGroups().get(2).getValue());
                                                    }
                                                }
                                            } finally {
                                                if (Bridge.is($t3, System.IDisposable)) {
                                                    $t3.System$IDisposable$Dispose();
                                                }
                                            }
                                            Console.writeLine();
                                        }
                                    } finally {
                                        if (Bridge.is($t2, System.IDisposable)) {
                                            $t2.System$IDisposable$Dispose();
                                        }
                                    }
                                    $task1 = Console.readKey();
                                    $step = 1;
                                    if ($task1.isCompleted()) {
                                        continue;
                                    }
                                    $task1.continue($asyncBody);
                                    return;
                                }
                                case 1: {
                                    $taskResult1 = $task1.getAwaitedResult();
                                    Console.foregroundColor = ConsoleColor.white;



                                    SetStartingState = function () {
                                        confidence = 1;
                                        alarmLevel = 0;
                                        currentEvent = Text_based_game.Program.events.getItem(4);
                                    };

                                    SetStartingState();


                                    storyline = new (System.Collections.Generic.List$1(System.String)).ctor();
                                    inventory = new (System.Collections.Generic.List$1(System.String)).ctor();

                                    Console.clear();
                                    Text_based_game.Program.PrintScript("A lone thief has set up camp in a forest. Less than a day away has a dragon made its lair. The thief has gathered what confidence they could find and has made it this far...");
                                    Text_based_game.Program.PrintScript("Will their confidence grow or falter? Will the dragon spot them or will they go unseen...");
                                    Text_based_game.Program.PrintScript("Only time will tell...");
                                    Console.writeLine();
                                    Text_based_game.Program.PrintScript("Press enter to commence with the theft.");
                                    $task2 = Console.readKey(true);
                                    $step = 2;
                                    if ($task2.isCompleted()) {
                                        continue;
                                    }
                                    $task2.continue($asyncBody);
                                    return;
                                }
                                case 2: {
                                    $taskResult2 = $task2.getAwaitedResult();
                                }
                                case 3: {
                                    if (alarmLevel === 5 && !storyline.contains("Dragon encounter")) {
                                        currentEvent = Text_based_game.Program.events.getItem(0);
                                    }

                                    ending1 = Text_based_game.Program.CheckGameOver(alarmLevel, confidence, storyline);
                                    if (ending1 != null) {
                                        $step = 4;
                                        continue;
                                    } 
                                    $step = 9;
                                    continue;
                                }
                                case 4: {
                                    Console.writeLine();
                                    Text_based_game.Program.HandleEnding(ending1);
                                    Console.writeLine();
                                    Console.writeLine("Do you want to play again? (Press \"r\" to replay or \"q\" to quit the game.");

                                    
                                }
                                case 5: {
                                    $task3 = Console.readKey(true);
                                    $step = 6;
                                    if ($task3.isCompleted()) {
                                        continue;
                                    }
                                    $task3.continue($asyncBody);
                                    return;
                                }
                                case 6: {
                                    $taskResult3 = $task3.getAwaitedResult();
                                    keyInfo = $taskResult3;
                                    userInput = String.fromCharCode(keyInfo.keyChar);

                                    if (Bridge.referenceEquals(userInput, "q")) {
                                        $tcs.setResult(null);
                                        return;
                                    }

                                    if (Bridge.referenceEquals(userInput, "r")) {
                                        SetStartingState();
                                        storyline.clear();
                                        inventory.clear();
                                        $step = 8;
                                        continue;
                                    }
                                    $step = 7;
                                    continue;
                                }
                                case 7: {
                                    if ( true ) {

                                        $step = 5;
                                        continue;
                                    }
                                    $step = 8;
                                    continue;
                                }

                                case 9: {
                                    Console.clear();
                                    Console.writeLine(System.String.format("Confidence:{0} Alarm Level:{1}\n", Bridge.box(confidence, System.Int32), Bridge.box(alarmLevel, System.Int32)));
                                    Text_based_game.Program.PrintScript(currentEvent.Narration);
                                    Console.writeLine();

                                    possibleChoices = new (System.Collections.Generic.List$1(Text_based_game.Choice)).ctor();
                                    notPossibleChoices = new (System.Collections.Generic.List$1(Text_based_game.Choice)).ctor();

                                    $t4 = Bridge.getEnumerator(currentEvent.Choices);
                                    try {
                                        while ($t4.moveNext()) {
                                            choice1 = $t4.Current;
                                            if (Text_based_game.Program.IsChoicePossible(choice1, confidence, storyline, inventory)) {
                                                possibleChoices.add(choice1);
                                            } else {
                                                notPossibleChoices.add(choice1);
                                            }
                                        }
                                    } finally {
                                        if (Bridge.is($t4, System.IDisposable)) {
                                            $t4.System$IDisposable$Dispose();
                                        }
                                    }

                                    counter = 1;
                                    $t5 = Bridge.getEnumerator(possibleChoices);
                                    try {
                                        while ($t5.moveNext()) {
                                            choice2 = $t5.Current;
                                            Text_based_game.Program.PrintScript(System.String.format("{0}. {1}", Bridge.box(counter, System.Int32), choice2.Name));
                                            counter = (counter + 1) | 0;
                                        }
                                    } finally {
                                        if (Bridge.is($t5, System.IDisposable)) {
                                            $t5.System$IDisposable$Dispose();
                                        }
                                    }

                                    Console.foregroundColor = ConsoleColor.darkGray;
                                    $t6 = Bridge.getEnumerator(notPossibleChoices);
                                    try {
                                        while ($t6.moveNext()) {
                                            choice3 = $t6.Current;
                                            Text_based_game.Program.PrintScript(System.String.format("{0}. ???", [Bridge.box(counter, System.Int32)]));
                                            counter = (counter + 1) | 0;
                                        }
                                    } finally {
                                        if (Bridge.is($t6, System.IDisposable)) {
                                            $t6.System$IDisposable$Dispose();
                                        }
                                    }
                                    Console.foregroundColor = ConsoleColor.white;


                                    
                                }
                                case 10: {
                                    $task4 = Console.readKey(true);
                                    $step = 11;
                                    if ($task4.isCompleted()) {
                                        continue;
                                    }
                                    $task4.continue($asyncBody);
                                    return;
                                }
                                case 11: {
                                    $taskResult4 = $task4.getAwaitedResult();
                                    keyInfo1 = $taskResult4;
                                    userInput = String.fromCharCode(keyInfo1.keyChar);

                                    if (System.Text.RegularExpressions.Regex.isMatch(userInput, "\\d")) {
                                        $step = 12;
                                        continue;
                                    } else  {
                                        $step = 13;
                                        continue;
                                    }
                                }
                                case 12: {
                                    intUserInput = System.Int32.parse(userInput);
                                    if (intUserInput > 0 && intUserInput <= possibleChoices.Count) {
                                        selectedChoice = possibleChoices.getItem(((intUserInput - 1) | 0));
                                        $step = 23;
                                        continue;
                                    } else if (intUserInput > possibleChoices.Count && intUserInput <= currentEvent.Choices.Count) {
                                        Text_based_game.Program.PrintScript("It seems like your confidence is lacking, or perhaps you are missing something?");
                                    } else {
                                        Text_based_game.Program.PrintScript("Try one of the listed numbers.");
                                    }
                                    $step = 21;
                                    continue;
                                }
                                case 13: {
                                    if (System.Text.RegularExpressions.Regex.isMatch(userInput, "e")) {
                                        $step = 14;
                                        continue;
                                    } else  {
                                        $step = 19;
                                        continue;
                                    }
                                }
                                case 14: {
                                    Console.writeLine("Enter ending number");

                                    
                                }
                                case 15: {
                                    $task5 = Console.readLine();
                                    $step = 16;
                                    if ($task5.isCompleted()) {
                                        continue;
                                    }
                                    $task5.continue($asyncBody);
                                    return;
                                }
                                case 16: {
                                    $taskResult5 = $task5.getAwaitedResult();
                                    cheat = $taskResult5;
                                    if (Bridge.referenceEquals(cheat, "1")) {
                                        alarmLevel = 6;

                                    } else if (Bridge.referenceEquals(cheat, "2")) {
                                        confidence = 5;
                                        alarmLevel = 3;
                                        storyline.add("Escape");

                                    } else if (Bridge.referenceEquals(cheat, "3")) {
                                        confidence = 0;
                                        alarmLevel = 3;
                                        storyline.add("Escape");

                                    } else if (Bridge.referenceEquals(cheat, "4")) {
                                        confidence = 5;
                                        alarmLevel = 0;
                                        storyline.add("Escape");

                                    } else if (Bridge.referenceEquals(cheat, "5")) {
                                        confidence = 0;
                                        alarmLevel = 0;
                                        storyline.add("Escape");

                                    } else if (Bridge.referenceEquals(cheat, "6")) {
                                        confidence = 3;
                                        alarmLevel = 3;
                                        inventory.add("Escape");
                                    } else {
                                        Console.writeLine("???");
                                        $tcs.setResult(null);
                                        return;
                                    }

                                    ending1 = Text_based_game.Program.CheckGameOver(alarmLevel, confidence, storyline);
                                    if (ending1 != null) {
                                        Text_based_game.Program.HandleEnding(ending1);
                                        Console.writeLine();
                                    }
                                    $step = 17;
                                    continue;
                                }
                                case 17: {
                                    if ( true ) {

                                        $step = 15;
                                        continue;
                                    }
                                    $step = 18;
                                    continue;
                                }
                                case 18: {
                                    $step = 20;
                                    continue;
                                }
                                case 19: {
                                    Text_based_game.Program.PrintScript("Try one of the listed nummbers.");
                                    $step = 20;
                                    continue;
                                }


                                case 22: {
                                    if ( true ) {

                                        $step = 10;
                                        continue;
                                    }
                                    $step = 23;
                                    continue;
                                }
                                case 23: {
                                    Console.writeLine();
                                    Text_based_game.Program.PrintScript(selectedChoice.Narration);
                                    $task6 = Console.readKey(true);
                                    $step = 24;
                                    if ($task6.isCompleted()) {
                                        continue;
                                    }
                                    $task6.continue($asyncBody);
                                    return;
                                }
                                case 24: {
                                    $taskResult6 = $task6.getAwaitedResult();
                                    confidence = (confidence + selectedChoice.ConfidenceAlteration) | 0;
                                    if (confidence < 0) {
                                        confidence = 0;
                                    }

                                    alarmLevel = (alarmLevel + selectedChoice.AlarmLevelAlteration) | 0;
                                    if (alarmLevel < 0) {
                                        alarmLevel = 0;
                                    }

                                    if (alarmLevel > 6) {
                                        alarmLevel = 6;
                                    }

                                    if (selectedChoice.SpecialItemGained != null) {
                                        inventory.add(selectedChoice.SpecialItemGained);
                                    }

                                    storyline.add(currentEvent.Name);

                                    if (Bridge.referenceEquals(currentEvent.Name, "Knights camp")) {
                                        if (inventory.contains("Main entrance")) {

                                            currentEvent = Text_based_game.Program.GetEvent("The main entrance");
                                        } else if (inventory.contains("Underground tunnels")) {
                                            currentEvent = Text_based_game.Program.GetEvent("The underground tunnel");
                                        } else {
                                            currentEvent = Text_based_game.Program.GetEvent("The secret door");
                                        }
                                    } else {
                                        if (Bridge.referenceEquals(currentEvent.Name, "Dragons' hoard")) {
                                            if (inventory.contains("Underground tunnels")) {
                                                currentEvent = Text_based_game.Program.GetEvent("Pick exit");
                                                $step = 25;
                                                continue;
                                            }
                                        }

                                        if (Bridge.referenceEquals(currentEvent.Name, "Help knight")) {
                                            if (!inventory.contains("Knights mark")) {
                                                storyline.remove("Help knight");
                                            }
                                        }

                                        if (Bridge.referenceEquals(currentEvent.Name, "Empty hoard") && Bridge.referenceEquals(selectedChoice.Name, "Save the knight") || Bridge.referenceEquals(currentEvent.Name, "Empty hoard with knight") && Bridge.referenceEquals(selectedChoice.Name, "Save the knight")) {
                                            alarmLevel = 5;
                                            storyline.add("Dragon encounter");
                                        }

                                        currentEvent = Text_based_game.Program.GetEvent(selectedChoice.NextEvent);
                                    }

                                    if (storyline.contains("Hidding from the dragon")) {
                                        storyline.remove("Dragon encounter");
                                    }
                                    $step = 25;
                                    continue;
                                }
                                case 25: {
                                    if ( true ) {

                                        $step = 3;
                                        continue;
                                    }
                                    $step = 26;
                                    continue;
                                }
                                case 26: {
                                    $tcs.setResult(null);
                                    return;
                                }
                                default: {
                                    $tcs.setResult(null);
                                    return;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        $tcs.setException($async_e);
                    }
                }, arguments);

            $asyncBody();
            return $tcs.task;
        },
        statics: {
            fields: {
                events: null,
                endings: null
            },
            ctors: {
                init: function () {
                    this.events = new (System.Collections.Generic.List$1(Text_based_game.Event)).ctor();
                    this.endings = new (System.Collections.Generic.List$1(Text_based_game.Ending)).ctor();
                }
            },
            methods: {
                PrintScript: function (text) {
                    var $t;
                    var words = System.String.split(text, System.Array.init([" "], System.String), null, 0);
                    $t = Bridge.getEnumerator(words);
                    try {
                        while ($t.moveNext()) {
                            var word = $t.Current;
                            var totalWidth = (Console.windowWidth - 4) | 0;
                            var cursourPosition = Console.cursorLeft;
                            var charactersLeft = (totalWidth - cursourPosition) | 0;

                            if (charactersLeft < word.length) {
                                Console.writeLine();
                            }

                            Console.write(System.String.format("{0} ", [word]));
                            Bridge.sleep(40);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    Console.writeLine();
                },
                CheckGameOver: function (alarmLevel, confidence, storyline) {
                    var $t, $t1;
                    $t = Bridge.getEnumerator(Text_based_game.Program.endings);
                    try {
                        while ($t.moveNext()) {
                            var ending = $t.Current;
                            if (confidence < ending.MinimumConfidence) {
                                continue;
                            }

                            if (confidence > ending.MaximumConfidence) {
                                continue;
                            }

                            if (alarmLevel < ending.MinimumAlarmLevel) {
                                continue;
                            }

                            if (alarmLevel > ending.MaximumAlarmLevel) {
                                continue;
                            }

                            if (ending.EventRequirements != null) {
                                var eventRequirementsAreMet = true;
                                $t1 = Bridge.getEnumerator(ending.EventRequirements);
                                try {
                                    while ($t1.moveNext()) {
                                        var eventRequirement = $t1.Current;
                                        if (!storyline.contains(eventRequirement)) {
                                            eventRequirementsAreMet = false;
                                        }
                                    }
                                } finally {
                                    if (Bridge.is($t1, System.IDisposable)) {
                                        $t1.System$IDisposable$Dispose();
                                    }
                                }

                                if (!eventRequirementsAreMet) {
                                    continue;
                                }

                            }

                            return ending;
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return null;

                },
                HandleEnding: function (ending) {
                    Console.writeLine(ending.Name);
                    Text_based_game.Program.PrintScript(ending.Narration);
                },
                GetEvent: function (name) {
                    var result = Text_based_game.Program.events.Find(function (storyEvent) {
                        return Bridge.referenceEquals(storyEvent.Name, name);
                    });
                    if (result != null) {
                        return result;
                    }
                    throw new System.ArgumentException.$ctor1("Event does not exist");
                },
                IsChoicePossible: function (choice, confidence, storyline, inventory) {
                    if (confidence < choice.MinimumConfidence) {
                        return false;
                    }

                    if (choice.EventRequirement != null && !storyline.contains(choice.EventRequirement)) {
                        return false;
                    }

                    if (choice.SpecialItemRequirement != null && !inventory.contains(choice.SpecialItemRequirement)) {
                        return false;
                    }

                    return true;
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUZXh0LWJhc2VkLWdhbWUtd2ViLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJQcm9ncmFtLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBa0orQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBRS9CQSxtQkFBaUNBO29DQUNqQ0EsaUNBQThFQTtvQ0FDOUVBLDRCQUFvRUE7b0NBQ3BFQSw2QkFBc0VBO29DQUMxREE7b0NBQ0FBO29DQUNBQTtvQ0FDQUE7b0NBQ0FBLHNCQUFzQkE7b0NBQ3RCQSx1QkFBdUJBOztvQ0FJdkJBO29DQUNBQSxhQUFvQkEsMkJBQWlCQTtvQ0FDckNBLGNBQXVCQSxnQ0FBaUJBLHNEQUFzQkE7O29DQUU5REE7b0NBQ0FBLGNBQXFCQSwyQkFBaUJBO29DQUN0Q0EsZUFBd0JBLGlDQUFrQkEsMERBQTBCQTs7b0NBRXBFQTtvQ0FDQUEsVUFBaUJBLDJCQUFpQkE7b0NBQ2xDQSxZQUFxQkEsNkJBQWNBLHNEQUFzQkE7O29DQUV6REE7b0NBQ0FBLGNBQXFCQSwyQkFBaUJBO29DQUN0Q0EsYUFBc0JBLGlDQUFrQkEsa0RBQWtCQTs7Ozs7Ozs7b0NBUXRFQSw2QkFBNkJBLFVBQUtBLFdBQWVBLE1BQWFBO3dDQUUxREEsV0FBYUEsMkNBQVlBLE1BQU1BO3dDQUMvQkEsSUFBSUE7NENBRUFBLGNBQVlBLG1CQUFZQTs7O29DQUtoQ0EsNEJBQTRCQSxVQUFLQSxXQUFrQkEsTUFBYUE7d0NBRTVEQSxXQUFhQSwyQ0FBWUEsTUFBTUE7d0NBQy9CQSxJQUFJQTs0Q0FFQUEsY0FBWUE7Ozs7b0NBT1JBLEtBQUtBLG9CQUFvQkEsYUFBYUEsb0JBQW9CQTt3Q0FHdERBLGVBQW1CQSxLQUFJQTt3Q0FDdkJBLGtCQUEyQkEsb0RBQWFBLFlBQWJBLGdCQUErQkEsc0RBQXNCQTs7d0NBR2hGQSwwQkFBa0NBOzs7O2dEQUU5QkEsYUFBbUJBLDJDQUFZQTs7Z0RBRy9CQSxTQUFhQSxJQUFJQTtnREFDakJBLGNBQWNBO2dEQUNkQSxtQkFBbUJBOztnREFFbkJBLHNDQUErQkEsaUNBQTZCQTtnREFDNURBLHNDQUErQkEsaUNBQTZCQTtnREFDNURBLHNDQUErQkEsOEJBQTBCQTtnREFDekRBLHFDQUE4QkEsbUNBQStCQTtnREFDN0RBLHFDQUE4QkEsOEJBQTBCQTtnREFDeERBLHFDQUE4QkEsNkJBQXlCQTtnREFDdkRBLHFDQUE4QkEsc0JBQWtCQTs7Z0RBR2hEQSxpQkFBaUJBOzs7Ozs7Ozt3Q0FJckJBLFlBQWtCQSwyQ0FBWUEsK0JBQVlBLFlBQVpBOzt3Q0FHOUJBLFdBQWVBLElBQUlBO3dDQUNuQkEsZ0JBQWdCQTt3Q0FDaEJBLHFCQUFxQkE7d0NBQ3JCQSxtQkFBbUJBO3dDQUNuQkEsbUNBQVdBOztvQ0FFM0JBLGlDQUFpQ0EsVUFBS0EsV0FBb0JBLE1BQWFBO3dDQUVuRUEsV0FBYUEsMkNBQVlBLE1BQU1BO3dDQUMvQkEsSUFBSUE7NENBRUFBLGNBQVlBLHdEQUEyQkEsZ0RBQWFBOzs7O29DQU9oREEsMkJBQTRCQTs7Ozs0Q0FFeEJBLFNBQWdCQSxJQUFJQTs7NENBRXBCQSxxQ0FBOEJBLGlCQUFhQTs0Q0FDM0NBLHFDQUE4QkEsc0JBQWtCQTs0Q0FDaERBLDBDQUFtQ0EsOEJBQTBCQTs0Q0FDN0RBLHNDQUErQkEsOEJBQTBCQTs0Q0FDekRBLHNDQUErQkEsOEJBQTBCQTs0Q0FDekRBLHNDQUErQkEsOEJBQTBCQTs0Q0FDekRBLHNDQUErQkEsOEJBQTBCQTs7NENBRXpEQSxvQ0FBWUE7Ozs7Ozs7OztvQ0FLaEJBLDJCQUF3QkE7Ozs7NENBRXBCQSxlQUErQkEsNkNBQWNBOzRDQUM3Q0EsMkJBQTZCQTs7OztvREFFekJBLElBQUlBO3dEQUVBQSxJQUFJQTs0REFFQUEsYUFBaUJBLHVCQUFnQkE7NERBQ2pDQSxRQUFxQkEsQUFBY0E7NERBQ25DQSwwQkFBMEJBOzt3REFFOUJBLGNBQWNBOzs7Ozs7Ozs0Q0FHdEJBOzs7Ozs7O29DQUVKQSxTQUFNQTs7Ozs7Ozs7OztvQ0FFTkEsMEJBQTBCQTs7OztvQ0FRdENBLG1CQUFtQkE7d0NBRWZBO3dDQUNBQTt3Q0FDQUEsZUFBZUE7OztvQ0FLUEE7OztvQ0FNQUEsWUFBZ0JBLEtBQUlBO29DQUVwQkEsWUFBZ0JBLEtBQUlBOztvQ0FHcEJBO29DQUNBQTtvQ0FDQUE7b0NBQ0FBO29DQUNBQTtvQ0FDQUE7b0NBQ0FBLFNBQU1BOzs7Ozs7Ozs7Ozs7b0NBS0ZBLElBQUlBLG9CQUFtQkEsQ0FBQ0E7d0NBRXBCQSxlQUFlQTs7O29DQUluQkEsVUFBZ0JBLHNDQUFjQSxZQUFZQSxZQUFZQTtvQ0FDdERBLElBQUlBLFdBQVVBOzs7Ozs7OztvQ0FFVkE7b0NBQ0FBLHFDQUFhQTtvQ0FDYkE7b0NBQ0FBOztvQ0FHQUE7OztvQ0FFSUEsU0FBK0JBOzs7Ozs7Ozs7OzhDQUFOQTtvQ0FDekJBLFlBQVlBOztvQ0FFWkEsSUFBSUE7d0NBRUFBOzs7O29DQUdKQSxJQUFJQTt3Q0FFQUE7d0NBQ0FBO3dDQUNBQTt3Q0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQU9aQTtvQ0FDQUEsa0JBQWtCQSx5REFBaURBLHNDQUFXQTtvQ0FDOUVBLG9DQUFZQTtvQ0FDWkE7O29DQUVBQSxrQkFBc0JBLEtBQUlBO29DQUMxQkEscUJBQXlCQSxLQUFJQTs7b0NBRzdCQSwyQkFBMEJBOzs7OzRDQUV0QkEsSUFBSUEseUNBQWlCQSxTQUFRQSxZQUFZQSxXQUFXQTtnREFFaERBLG9CQUFvQkE7O2dEQUlwQkEsdUJBQXVCQTs7Ozs7Ozs7O29DQUsvQkE7b0NBQ0FBLDJCQUEwQkE7Ozs7NENBRXRCQSxvQ0FBWUEsaUNBQXlCQSxtQ0FBUUE7NENBQzdDQTs7Ozs7Ozs7b0NBSUpBLDBCQUEwQkE7b0NBQzFCQSwyQkFBMEJBOzs7OzRDQUV0QkEsb0NBQVlBLGtDQUF5QkE7NENBQ3JDQTs7Ozs7OztvQ0FFSkEsMEJBQTBCQTs7O29DQUsxQkE7OztvQ0FFSUEsU0FBK0JBOzs7Ozs7Ozs7OytDQUFOQTtvQ0FDekJBLFlBQVlBOztvQ0FFWkEsSUFBSUEsNkNBQWNBOzs7Ozs7Ozs7b0NBRWRBLGVBQWVBLG1CQUFVQTtvQ0FDekJBLElBQUlBLG9CQUFvQkEsZ0JBQWdCQTt3Q0FFcENBLGlCQUFpQkEsd0JBQWdCQTt3Q0FDakNBOzsyQ0FFQ0EsSUFBSUEsZUFBZUEseUJBQXlCQSxnQkFBZ0JBO3dDQUU3REE7O3dDQUlBQTs7Ozs7O29DQUlIQSxJQUFJQSw2Q0FBY0E7Ozs7Ozs7OztvQ0FFbkJBOztvQ0FFQUE7OztvQ0FFSUEsU0FBcUJBOzs7Ozs7Ozs7OzRDQUFOQTtvQ0FDZkEsSUFBSUE7d0NBRUFBOzsyQ0FHQ0EsSUFBSUE7d0NBRUxBO3dDQUNBQTt3Q0FDQUE7OzJDQUdDQSxJQUFJQTt3Q0FFTEE7d0NBQ0FBO3dDQUNBQTs7MkNBR0NBLElBQUlBO3dDQUVMQTt3Q0FDQUE7d0NBQ0FBOzsyQ0FHQ0EsSUFBSUE7d0NBRUxBO3dDQUNBQTt3Q0FDQUE7OzJDQUdDQSxJQUFJQTt3Q0FFTEE7d0NBQ0FBO3dDQUNBQTs7d0NBSUFBO3dDQUNBQTs7OztvQ0FHSkEsVUFBU0Esc0NBQWNBLFlBQVlBLFlBQVlBO29DQUMvQ0EsSUFBSUEsV0FBVUE7d0NBRVZBLHFDQUFhQTt3Q0FDYkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBT1JBOzs7Ozs7Ozs7Ozs7Ozs7O29DQU1SQTtvQ0FDQUEsb0NBQVlBO29DQUNaQSxTQUFNQTs7Ozs7Ozs7OztvQ0FFTkEsMkJBQWNBO29DQUNkQSxJQUFJQTt3Q0FFQUE7OztvQ0FHSkEsMkJBQWNBO29DQUNkQSxJQUFJQTt3Q0FFQUE7OztvQ0FHSkEsSUFBSUE7d0NBRUFBOzs7b0NBSUpBLElBQUlBLG9DQUFvQ0E7d0NBRXBDQSxjQUFjQTs7O29DQUlsQkEsY0FBY0E7O29DQUdkQSxJQUFJQTt3Q0FFQUEsSUFBSUE7OzRDQUdBQSxlQUFlQTsrQ0FFZEEsSUFBSUE7NENBRUxBLGVBQWVBOzs0Q0FJZkEsZUFBZUE7Ozt3Q0FLbkJBLElBQUlBOzRDQUVBQSxJQUFJQTtnREFFQUEsZUFBZUE7Z0RBQ2ZBOzs7Ozt3Q0FJUkEsSUFBSUE7NENBRUFBLElBQUlBLENBQUNBO2dEQUVEQTs7Ozt3Q0FJUkEsSUFBSUEsNERBQXNDQSxrRUFBNENBLHdFQUFrREE7NENBRXBJQTs0Q0FDQUE7Ozt3Q0FHSkEsZUFBZUEsaUNBQVNBOzs7b0NBRzVCQSxJQUFJQTt3Q0FFQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBMWhCZ0JBLEtBQUlBO21DQUNGQSxLQUFJQTs7Ozt1Q0FFVkE7O29CQUVwQkEsWUFBaUJBLDBCQUFXQSwrQ0FBZUE7b0JBQzNDQSwwQkFBd0JBOzs7OzRCQUVwQkEsaUJBQWlCQTs0QkFDakJBLHNCQUFzQkE7NEJBQ3RCQSxxQkFBcUJBLGNBQWFBOzs0QkFFbENBLElBQUlBLGlCQUFpQkE7Z0NBRWpCQTs7OzRCQUdKQSxjQUFjQSw4QkFBcUJBOzRCQUNuQ0E7Ozs7Ozs7b0JBRUpBOzt5Q0FHd0JBLFlBQWdCQSxZQUFnQkE7O29CQUV4REEsMEJBQTBCQTs7Ozs0QkFFdEJBLElBQUlBLGFBQWFBO2dDQUViQTs7OzRCQUdKQSxJQUFJQSxhQUFhQTtnQ0FFYkE7Ozs0QkFHSkEsSUFBSUEsYUFBYUE7Z0NBRWJBOzs7NEJBR0pBLElBQUlBLGFBQWFBO2dDQUViQTs7OzRCQUdKQSxJQUFJQSw0QkFBNEJBO2dDQUU1QkE7Z0NBQ0FBLDJCQUFvQ0E7Ozs7d0NBRWhDQSxJQUFJQSxDQUFDQSxtQkFBbUJBOzRDQUVwQkE7Ozs7Ozs7OztnQ0FJUkEsSUFBSUEsQ0FBQ0E7b0NBRURBOzs7Ozs0QkFLUkEsT0FBT0E7Ozs7Ozs7b0JBRVhBLE9BQU9BOzs7d0NBSWNBO29CQUVyQkEsa0JBQWtCQTtvQkFDbEJBLG9DQUFZQTs7b0NBR01BO29CQUVsQkEsYUFBZUEsb0NBQVlBLEFBQW1CQTsrQkFBY0Esd0NBQW1CQTs7b0JBQy9FQSxJQUFJQSxVQUFVQTt3QkFFVkEsT0FBT0E7O29CQUVYQSxNQUFNQSxJQUFJQTs7NENBR2VBLFFBQWVBLFlBQWdCQSxXQUF3QkE7b0JBRWhGQSxJQUFJQSxhQUFhQTt3QkFFYkE7OztvQkFHSkEsSUFBSUEsMkJBQTJCQSxRQUFRQSxDQUFDQSxtQkFBbUJBO3dCQUV2REE7OztvQkFHSkEsSUFBSUEsaUNBQWlDQSxRQUFRQSxDQUFDQSxtQkFBbUJBO3dCQUU3REE7OztvQkFHSkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgRG90TmV0Q29uc29sZUpTO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uSU87XHJcbnVzaW5nIFN5c3RlbS5UZXh0LlJlZ3VsYXJFeHByZXNzaW9ucztcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQ29uc29sZSA9IERvdE5ldENvbnNvbGVKUy5Db25zb2xlO1xyXG5cclxubmFtZXNwYWNlIFRleHRfYmFzZWRfZ2FtZVxyXG57XHJcbiAgICBjbGFzcyBFbmRpbmdcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWU7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBOYXJyYXRpb247XHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEV2ZW50UmVxdWlyZW1lbnRzO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgTWluaW11bUNvbmZpZGVuY2UgPSAwO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgTWF4aW11bUNvbmZpZGVuY2UgPSAyMTQ3NDgzNjQ3O1xyXG4gICAgICAgIHB1YmxpYyBpbnQgTWluaW11bUFsYXJtTGV2ZWwgPSAwO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgTWF4aW11bUFsYXJtTGV2ZWwgPSA2O1xyXG4gICAgfVxyXG4gICAgY2xhc3MgRXZlbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWU7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBOYXJyYXRpb247XHJcbiAgICAgICAgcHVibGljIExpc3Q8Q2hvaWNlPiBDaG9pY2VzO1xyXG4gICAgfVxyXG4gICAgY2xhc3MgQ2hvaWNlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBNaW5pbXVtQ29uZmlkZW5jZTtcclxuICAgICAgICBwdWJsaWMgaW50IENvbmZpZGVuY2VBbHRlcmF0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQWxhcm1MZXZlbEFsdGVyYXRpb247XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBFdmVudFJlcXVpcmVtZW50O1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU3BlY2lhbEl0ZW1SZXF1aXJlbWVudDtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFNwZWNpYWxJdGVtR2FpbmVkO1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFycmF0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZTtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5leHRFdmVudDtcclxuICAgIH1cclxuICAgIGludGVybmFsIGNsYXNzIFByb2dyYW1cclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTGlzdDxFdmVudD4gZXZlbnRzID0gbmV3IExpc3Q8RXZlbnQ+KCk7XHJcbiAgICAgICAgc3RhdGljIExpc3Q8RW5kaW5nPiBlbmRpbmdzID0gbmV3IExpc3Q8RW5kaW5nPigpO1xyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBQcmludFNjcmlwdChzdHJpbmcgdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cmluZ1tdIHdvcmRzID0gdGV4dC5TcGxpdChuZXdbXSB7IFwiIFwiIH0sIFN0cmluZ1NwbGl0T3B0aW9ucy5Ob25lKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAoc3RyaW5nIHdvcmQgaW4gd29yZHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB0b3RhbFdpZHRoID0gQ29uc29sZS5XaW5kb3dXaWR0aCAtIDQ7XHJcbiAgICAgICAgICAgICAgICBpbnQgY3Vyc291clBvc2l0aW9uID0gQ29uc29sZS5DdXJzb3JMZWZ0O1xyXG4gICAgICAgICAgICAgICAgaW50IGNoYXJhY3RlcnNMZWZ0ID0gdG90YWxXaWR0aCAtIGN1cnNvdXJQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyc0xlZnQgPCB3b3JkLkxlbmd0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGUoc3RyaW5nLkZvcm1hdChcInswfSBcIix3b3JkKSk7XHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uVGhyZWFkaW5nLlRocmVhZC5TbGVlcCg0MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9BIG1ldGhvZCB3aGljaCBjaGVja3MgaWYgdGhlIGdhbWUgaXMgb3ZlciBhbmQgZ2l2ZXMgdGhlIG1hdGNoaW5nIGVuZGluZyB0byBIYW5kbGVFbmRpbmcuXHJcbiAgICAgICAgc3RhdGljIEVuZGluZyBDaGVja0dhbWVPdmVyKGludCBhbGFybUxldmVsLCBpbnQgY29uZmlkZW5jZSwgTGlzdDxzdHJpbmc+IHN0b3J5bGluZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEVuZGluZyBlbmRpbmcgaW4gZW5kaW5ncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZGVuY2UgPCBlbmRpbmcuTWluaW11bUNvbmZpZGVuY2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZGVuY2UgPiBlbmRpbmcuTWF4aW11bUNvbmZpZGVuY2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFsYXJtTGV2ZWwgPCBlbmRpbmcuTWluaW11bUFsYXJtTGV2ZWwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFsYXJtTGV2ZWwgPiBlbmRpbmcuTWF4aW11bUFsYXJtTGV2ZWwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVuZGluZy5FdmVudFJlcXVpcmVtZW50cyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgZXZlbnRSZXF1aXJlbWVudHNBcmVNZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHN0cmluZyBldmVudFJlcXVpcmVtZW50IGluIGVuZGluZy5FdmVudFJlcXVpcmVtZW50cylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RvcnlsaW5lLkNvbnRhaW5zKGV2ZW50UmVxdWlyZW1lbnQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFJlcXVpcmVtZW50c0FyZU1ldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWV2ZW50UmVxdWlyZW1lbnRzQXJlTWV0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5kaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9BIG1ldGhvZCB3aGljaCBvdXRwdXRzIHRoZSBlbmRpbmcgcmVjZWl2ZWQgZnJvbSBDaGVja0dhbWVPdmVyLlxyXG4gICAgICAgIHN0YXRpYyB2b2lkIEhhbmRsZUVuZGluZyhFbmRpbmcgZW5kaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoZW5kaW5nLk5hbWUpO1xyXG4gICAgICAgICAgICBQcmludFNjcmlwdChlbmRpbmcuTmFycmF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9TZXQgdGhlIG5leHQgZXZlbnQuXHJcbiAgICAgICAgc3RhdGljIEV2ZW50IEdldEV2ZW50KHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRXZlbnQgcmVzdWx0ID0gZXZlbnRzLkZpbmQoKFByZWRpY2F0ZTxFdmVudD4pKHN0b3J5RXZlbnQgPT4gc3RvcnlFdmVudC5OYW1lID09IG5hbWUpKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihcIkV2ZW50IGRvZXMgbm90IGV4aXN0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0NoZWNrcyBjb25kaXRpb25zIGZvciB0aGUgY2hvaWNlcyBvZiB0aGUgY3VycmVudCBldmVudC5cclxuICAgICAgICBzdGF0aWMgYm9vbCBJc0Nob2ljZVBvc3NpYmxlKENob2ljZSBjaG9pY2UsIGludCBjb25maWRlbmNlLCBMaXN0PHN0cmluZz4gc3RvcnlsaW5lLCBMaXN0PHN0cmluZz4gaW52ZW50b3J5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZGVuY2UgPCBjaG9pY2UuTWluaW11bUNvbmZpZGVuY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNob2ljZS5FdmVudFJlcXVpcmVtZW50ICE9IG51bGwgJiYgIXN0b3J5bGluZS5Db250YWlucyhjaG9pY2UuRXZlbnRSZXF1aXJlbWVudCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNob2ljZS5TcGVjaWFsSXRlbVJlcXVpcmVtZW50ICE9IG51bGwgJiYgIWludmVudG9yeS5Db250YWlucyhjaG9pY2UuU3BlY2lhbEl0ZW1SZXF1aXJlbWVudCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBhc3luYyBUYXNrIE1haW4oc3RyaW5nW10gYXJncylcclxuICAgICAgICB7XHJcblN5c3RlbS5BY3Rpb24gU2V0U3RhcnRpbmdTdGF0ZSA9IG51bGw7XG5fX19Jbml0aWFsaXplU3RyaW5nQXJyYXlQYXJhbWV0ZXJfRGVsZWdhdGVfMiBJbml0aWFsaXplU3RyaW5nQXJyYXlQYXJhbWV0ZXIgPSBudWxsO1xuX19fSW5pdGlhbGl6ZVN0cmluZ1BhcmFtZXRlcl9EZWxlZ2F0ZV8xIEluaXRpYWxpemVTdHJpbmdQYXJhbWV0ZXIgPSBudWxsO1xuX19fSW5pdGlhbGl6ZUludGVnZXJQYXJhbWV0ZXJfRGVsZWdhdGVfMCBJbml0aWFsaXplSW50ZWdlclBhcmFtZXRlciA9IG51bGw7XG4gICAgICAgICAgICBDb25zb2xlLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIENvbnNvbGUuQ3Vyc29yVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBDb25zb2xlLldpbmRvd1dpZHRoID0gODY7XHJcbiAgICAgICAgICAgIENvbnNvbGUuV2luZG93SGVpZ2h0ID0gMjc7XHJcbiAgICAgICAgICAgIENvbnNvbGUuQnVmZmVyV2lkdGggPSBDb25zb2xlLldpbmRvd1dpZHRoO1xyXG4gICAgICAgICAgICBDb25zb2xlLkJ1ZmZlckhlaWdodCA9IENvbnNvbGUuV2luZG93SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgLy9Jbml0aWFsaXphdGlvblxyXG4gICAgICAgICAgICAvL1JlYWRpbmcgZmlsZXMgYW5kIHRoZW4gc3BsaXR0aW5nIHRoZW0gd2hlbiBuZWVkZWQuXHJcbiAgICAgICAgICAgIHN0cmluZyBldmVudHNQYXRoID0gXCJFdmVudHMudHh0XCI7XHJcbiAgICAgICAgICAgIHN0cmluZyBldmVudHNUZXh0ID0gRmlsZS5SZWFkQWxsVGV4dChldmVudHNQYXRoKTtcclxuICAgICAgICAgICAgc3RyaW5nW10gZXZlbnRHcm91cHMgPSBldmVudHNUZXh0LlNwbGl0KG5ld1tdIHsgXCJcXHJcXG5cXHJcXG5cIiB9LCBTdHJpbmdTcGxpdE9wdGlvbnMuTm9uZSk7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmcgY2hvaWNlc1BhdGggPSBcIkNob2ljZXMudHh0XCI7XHJcbiAgICAgICAgICAgIHN0cmluZyBjaG9pY2VzVGV4dCA9IEZpbGUuUmVhZEFsbFRleHQoY2hvaWNlc1BhdGgpO1xyXG4gICAgICAgICAgICBzdHJpbmdbXSBjaG9pY2VHcm91cHMgPSBjaG9pY2VzVGV4dC5TcGxpdChuZXdbXSB7IFwiXFxyXFxuXFxyXFxuXFxyXFxuXCIgfSwgU3RyaW5nU3BsaXRPcHRpb25zLk5vbmUpO1xyXG5cclxuICAgICAgICAgICAgc3RyaW5nIGVuZFBhdGggPSBcIkVuZGluZ3MudHh0XCI7XHJcbiAgICAgICAgICAgIHN0cmluZyBlbmRUZXh0ID0gRmlsZS5SZWFkQWxsVGV4dChlbmRQYXRoKTtcclxuICAgICAgICAgICAgc3RyaW5nW10gZW5kR3JvdXBzID0gZW5kVGV4dC5TcGxpdChuZXdbXSB7IFwiXFxyXFxuXFxyXFxuXCIgfSwgU3RyaW5nU3BsaXRPcHRpb25zLk5vbmUpO1xyXG5cclxuICAgICAgICAgICAgc3RyaW5nIHRpdGxlU2NyZWVuUGF0aCA9IFwiRm9ydHVuZSBmYXZvciB0aGUgYm9sZCB0aXRsZSBzY3JlZW4udHh0XCI7XHJcbiAgICAgICAgICAgIHN0cmluZyB0aXRsZVNjcmVlbiA9IEZpbGUuUmVhZEFsbFRleHQodGl0bGVTY3JlZW5QYXRoKTtcclxuICAgICAgICAgICAgc3RyaW5nW10gdGl0bGVMaW5lcyA9IHRpdGxlU2NyZWVuLlNwbGl0KG5ld1tdIHsgXCJcXHJcXG5cIiB9LCBTdHJpbmdTcGxpdE9wdGlvbnMuTm9uZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIFxyXG5Jbml0aWFsaXplSW50ZWdlclBhcmFtZXRlciA9IChyZWYgaW50IHBhcmFtZXRlciwgc3RyaW5nIHRleHQsIHN0cmluZyByZWdleCkgPT5cclxue1xyXG4gICAgTWF0Y2ggaW5mbyA9IFJlZ2V4Lk1hdGNoKHRleHQsIHJlZ2V4KTtcclxuICAgIGlmIChpbmZvLlN1Y2Nlc3MpXHJcbiAgICB7XHJcbiAgICAgICAgcGFyYW1ldGVyID0gSW50MzIuUGFyc2UoaW5mby5Hcm91cHNbMV0uVmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG47XG5Jbml0aWFsaXplU3RyaW5nUGFyYW1ldGVyID0gKHJlZiBzdHJpbmcgcGFyYW1ldGVyLCBzdHJpbmcgdGV4dCwgc3RyaW5nIHJlZ2V4KSA9PlxyXG57XHJcbiAgICBNYXRjaCBpbmZvID0gUmVnZXguTWF0Y2godGV4dCwgcmVnZXgpO1xyXG4gICAgaWYgKGluZm8uU3VjY2VzcylcclxuICAgIHtcclxuICAgICAgICBwYXJhbWV0ZXIgPSBpbmZvLkdyb3Vwc1sxXS5WYWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuO1xuXHJcbiAgICAgICAgICAgIC8vSW5pdGlhbGl6ZSBjaG9pY2VzIGFuZCBldmVudHMuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGV2ZW50SW5kZXggPSAwOyBldmVudEluZGV4IDwgZXZlbnRHcm91cHMuTGVuZ3RoOyBldmVudEluZGV4KyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vTGlzdCBvZiBjaG9pY2VzIGluIGluZGl2aWR1YWwgZXZlbnRzLlxyXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50Q2hvaWNlcyA9IG5ldyBMaXN0PENob2ljZT4oKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ1tdIGNob2ljZXNQZXJFdmVudCA9IGNob2ljZUdyb3Vwc1tldmVudEluZGV4XS5TcGxpdChuZXdbXSB7IFwiXFxyXFxuXFxyXFxuXCIgfSwgU3RyaW5nU3BsaXRPcHRpb25zLk5vbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vVXNpbmcgcmVnZXggdG8gZmluZCBpbmRpdmlkdWFsIGl0ZW1zIGluIHRoZSBjaG9pY2UgZmlsZS5cclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHN0cmluZyBjaG9pY2VJbmZvVGV4dCBpbiBjaG9pY2VzUGVyRXZlbnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTWF0Y2ggY2hvaWNlSW5mbyA9IFJlZ2V4Lk1hdGNoKGNob2ljZUluZm9UZXh0LCBcIk5hbWU6ICguKilcXFxcclxcXFxuTmFycmF0aW9uOiAoLiopXFxcXHJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vQ2hvaWNlIGNsYXNzIGRlZmluaXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNob2ljZSA9IG5ldyBDaG9pY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBjaG9pY2UuTmFtZSA9IGNob2ljZUluZm8uR3JvdXBzWzFdLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZS5OYXJyYXRpb24gPSBjaG9pY2VJbmZvLkdyb3Vwc1syXS5WYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgSW5pdGlhbGl6ZUludGVnZXJQYXJhbWV0ZXIocmVmIGNob2ljZS5Db25maWRlbmNlQWx0ZXJhdGlvbiwgY2hvaWNlSW5mb1RleHQsIFwiQ29uZmlkZW5jZSBhbHRlcmF0aW9uOiAoW15cXFxccl0qKVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBJbml0aWFsaXplSW50ZWdlclBhcmFtZXRlcihyZWYgY2hvaWNlLkFsYXJtTGV2ZWxBbHRlcmF0aW9uLCBjaG9pY2VJbmZvVGV4dCwgXCJBbGFybSBsZXZlbCBhbHRlcmF0aW9uOiAoW15cXFxccl0qKVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBJbml0aWFsaXplSW50ZWdlclBhcmFtZXRlcihyZWYgY2hvaWNlLk1pbmltdW1Db25maWRlbmNlLCBjaG9pY2VJbmZvVGV4dCwgXCJNaW5pbXVtIGNvbmZpZGVuY2U6IChbXlxcXFxyXSopXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEluaXRpYWxpemVTdHJpbmdQYXJhbWV0ZXIocmVmIGNob2ljZS5TcGVjaWFsSXRlbVJlcXVpcmVtZW50LCBjaG9pY2VJbmZvVGV4dCwgXCJTcGVjaWFsIGl0ZW0gcmVxdWlyZW1lbnQ6IChbXlxcXFxyXSopXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEluaXRpYWxpemVTdHJpbmdQYXJhbWV0ZXIocmVmIGNob2ljZS5TcGVjaWFsSXRlbUdhaW5lZCwgY2hvaWNlSW5mb1RleHQsIFwiU3BlY2lhbCBpdGVtIGdhaW5lZDogKFteXFxcXHJdKilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgSW5pdGlhbGl6ZVN0cmluZ1BhcmFtZXRlcihyZWYgY2hvaWNlLkV2ZW50UmVxdWlyZW1lbnQsIGNob2ljZUluZm9UZXh0LCBcIkV2ZW50IHJlcXVyaWVtZW50OiAoW15cXFxccl0qKVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBJbml0aWFsaXplU3RyaW5nUGFyYW1ldGVyKHJlZiBjaG9pY2UuTmV4dEV2ZW50LCBjaG9pY2VJbmZvVGV4dCwgXCJOZXh0IGV2ZW50OiAoW15cXFxccl0qKVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9BZGRpbmcgY2hvaWNlcyBpbnRvIGEgbGlzdCB0aGF0IGdvZXMgdG8gZXZlbnQgY2xhc3MuXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDaG9pY2VzLkFkZChjaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vVXNpbmcgcmVnZXggdG8gZmluZCBpbmRpdmlkdWFsIGl0ZW1zIGluIHRoZSBldmVudHMgZmlsZS5cclxuICAgICAgICAgICAgICAgIE1hdGNoIGV2ZW50SW5mbyA9IFJlZ2V4Lk1hdGNoKGV2ZW50R3JvdXBzW2V2ZW50SW5kZXhdLCBcIk5hbWU6ICguKilcXFxcclxcXFxuTmFycmF0aW9uOiAoLiopXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vRXZlbnQgY2xhc3MgZGVmaW5pdGlvbi5cclxuICAgICAgICAgICAgICAgIHZhciBuZXdFdmVudCA9IG5ldyBFdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgbmV3RXZlbnQuTmFtZSA9IGV2ZW50SW5mby5Hcm91cHNbMV0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBuZXdFdmVudC5OYXJyYXRpb24gPSBldmVudEluZm8uR3JvdXBzWzJdLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbmV3RXZlbnQuQ2hvaWNlcyA9IGV2ZW50Q2hvaWNlcztcclxuICAgICAgICAgICAgICAgIGV2ZW50cy5BZGQobmV3RXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbkluaXRpYWxpemVTdHJpbmdBcnJheVBhcmFtZXRlciA9IChyZWYgc3RyaW5nW10gcGFyYW1ldGVyLCBzdHJpbmcgdGV4dCwgc3RyaW5nIHJlZ2V4KSA9PlxyXG57XHJcbiAgICBNYXRjaCBpbmZvID0gUmVnZXguTWF0Y2godGV4dCwgcmVnZXgpO1xyXG4gICAgaWYgKGluZm8uU3VjY2VzcylcclxuICAgIHtcclxuICAgICAgICBwYXJhbWV0ZXIgPSBpbmZvLkdyb3Vwc1sxXS5WYWx1ZS5TcGxpdChuZXdbXXtcIiwgXCJ9LCBTdHJpbmdTcGxpdE9wdGlvbnMuTm9uZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbjtcblxyXG4gICAgICAgICAgICAvL0luaXRpYWxpemUgZW5kaW5ncy5cclxuICAgICAgICAgICAgZm9yZWFjaCAoc3RyaW5nIGVuZEdyb3VwIGluIGVuZEdyb3VwcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRW5kaW5nIGVuZGluZyA9IG5ldyBFbmRpbmcoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBJbml0aWFsaXplU3RyaW5nUGFyYW1ldGVyKHJlZiBlbmRpbmcuTmFtZSwgZW5kR3JvdXAsIFwiTmFtZTogKFteXFxcXHJdKylcIik7XHJcbiAgICAgICAgICAgICAgICBJbml0aWFsaXplU3RyaW5nUGFyYW1ldGVyKHJlZiBlbmRpbmcuTmFycmF0aW9uLCBlbmRHcm91cCwgXCJOYXJyYXRpb246IChbXlxcXFxyXSspXCIpO1xyXG4gICAgICAgICAgICAgICAgSW5pdGlhbGl6ZVN0cmluZ0FycmF5UGFyYW1ldGVyKHJlZiBlbmRpbmcuRXZlbnRSZXF1aXJlbWVudHMsIGVuZEdyb3VwLCBcIkV2ZW50IHJlcXVpcmVtZW50OiAoW15cXFxccl0rKVwiKTtcclxuICAgICAgICAgICAgICAgIEluaXRpYWxpemVJbnRlZ2VyUGFyYW1ldGVyKHJlZiBlbmRpbmcuTWluaW11bUNvbmZpZGVuY2UsIGVuZEdyb3VwLCBcIk1pbmltdW0gY29uZmlkZW5jZTogKFteXFxcXHJdKylcIik7XHJcbiAgICAgICAgICAgICAgICBJbml0aWFsaXplSW50ZWdlclBhcmFtZXRlcihyZWYgZW5kaW5nLk1heGltdW1Db25maWRlbmNlLCBlbmRHcm91cCwgXCJNYXhpbXVtIGNvbmZpZGVuY2U6IChbXlxcXFxyXSspXCIpO1xyXG4gICAgICAgICAgICAgICAgSW5pdGlhbGl6ZUludGVnZXJQYXJhbWV0ZXIocmVmIGVuZGluZy5NaW5pbXVtQWxhcm1MZXZlbCwgZW5kR3JvdXAsIFwiTWluaW11bSBhbGFybSBsZXZlbDogKFteXFxcXHJdKylcIik7XHJcbiAgICAgICAgICAgICAgICBJbml0aWFsaXplSW50ZWdlclBhcmFtZXRlcihyZWYgZW5kaW5nLk1heGltdW1BbGFybUxldmVsLCBlbmRHcm91cCwgXCJNYXhpbXVtIGFsYXJtIGxldmVsOiAoW15cXFxccl0rKVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlbmRpbmdzLkFkZChlbmRpbmcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy9EaXNwbGF5IHRpdGxlIHNjcmVlbiB3aXRoIGNvbG9yLlxyXG4gICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcgbGluZSBpbiB0aXRsZUxpbmVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNYXRjaENvbGxlY3Rpb24gY29sb3JNYXRjaGVzID0gUmVnZXguTWF0Y2hlcyhsaW5lLCBcIig/OlxcXFwqKFxcXFxkezEsMn0pXFxcXCp8XikoLio/KSg/PVxcXFwqXFxcXGR7MSwyfVxcXFwqfCQpXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAoTWF0Y2ggY29sb3JNYXRjaCBpbiBjb2xvck1hdGNoZXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yTWF0Y2guU3VjY2VzcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xvck1hdGNoLkdyb3Vwc1sxXS5TdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnQgdGl0bGVDb2xvciA9IENvbnZlcnQuVG9JbnQzMihjb2xvck1hdGNoLkdyb3Vwc1sxXS5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25zb2xlQ29sb3IgY29sb3IgPSAoQ29uc29sZUNvbG9yKXRpdGxlQ29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25zb2xlLkZvcmVncm91bmRDb2xvciA9IGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGUoY29sb3JNYXRjaC5Hcm91cHNbMl0uVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXdhaXQgQ29uc29sZS5SZWFkS2V5KCk7XHJcblxyXG4gICAgICAgICAgICBDb25zb2xlLkZvcmVncm91bmRDb2xvciA9IENvbnNvbGVDb2xvci5XaGl0ZTtcclxuXHJcbiAgICAgICAgICAgIC8vR2FtZXBsYXlcclxuICAgICAgICAgICAgaW50IGNvbmZpZGVuY2U7XHJcbiAgICAgICAgICAgIGludCBhbGFybUxldmVsO1xyXG4gICAgICAgICAgICBFdmVudCBjdXJyZW50RXZlbnQ7XHJcblxyXG4gICAgICAgICAgICBcclxuU2V0U3RhcnRpbmdTdGF0ZSA9ICgpID0+XHJcbntcclxuICAgIGNvbmZpZGVuY2UgPSAxO1xyXG4gICAgYWxhcm1MZXZlbCA9IDA7XHJcbiAgICBjdXJyZW50RXZlbnQgPSBldmVudHNbNF07XHJcbn1cclxuXHJcbjtcblxyXG4gICAgICAgICAgICBTZXRTdGFydGluZ1N0YXRlKCk7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmcgdXNlcklucHV0O1xyXG4gICAgICAgICAgICBpbnQgaW50VXNlcklucHV0O1xyXG5cclxuICAgICAgICAgICAgLy9MaXN0IG9mIGV2ZW50cyB0aGUgcGxheWVyIGhhcyBjbGVhcmVkLlxyXG4gICAgICAgICAgICB2YXIgc3RvcnlsaW5lID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAvL0xpc3Qgb2Ygc3BlY2lhbCBpdGVtIHBsYXllciBoYXMgZ2FpbmVkLlxyXG4gICAgICAgICAgICB2YXIgaW52ZW50b3J5ID0gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICAgICAgLy9HYW1lIGludHJvLlxyXG4gICAgICAgICAgICBDb25zb2xlLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIFByaW50U2NyaXB0KFwiQSBsb25lIHRoaWVmIGhhcyBzZXQgdXAgY2FtcCBpbiBhIGZvcmVzdC4gTGVzcyB0aGFuIGEgZGF5IGF3YXkgaGFzIGEgZHJhZ29uIG1hZGUgaXRzIGxhaXIuIFRoZSB0aGllZiBoYXMgZ2F0aGVyZWQgd2hhdCBjb25maWRlbmNlIHRoZXkgY291bGQgZmluZCBhbmQgaGFzIG1hZGUgaXQgdGhpcyBmYXIuLi5cIik7XHJcbiAgICAgICAgICAgIFByaW50U2NyaXB0KFwiV2lsbCB0aGVpciBjb25maWRlbmNlIGdyb3cgb3IgZmFsdGVyPyBXaWxsIHRoZSBkcmFnb24gc3BvdCB0aGVtIG9yIHdpbGwgdGhleSBnbyB1bnNlZW4uLi5cIik7XHJcbiAgICAgICAgICAgIFByaW50U2NyaXB0KFwiT25seSB0aW1lIHdpbGwgdGVsbC4uLlwiKTtcclxuICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoKTtcclxuICAgICAgICAgICAgUHJpbnRTY3JpcHQoXCJQcmVzcyBlbnRlciB0byBjb21tZW5jZSB3aXRoIHRoZSB0aGVmdC5cIik7XHJcbiAgICAgICAgICAgIGF3YWl0IENvbnNvbGUuUmVhZEtleSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vQWxhcm0gY2hlY2suXHJcbiAgICAgICAgICAgICAgICBpZiAoYWxhcm1MZXZlbCA9PSA1ICYmICFzdG9yeWxpbmUuQ29udGFpbnMoXCJEcmFnb24gZW5jb3VudGVyXCIpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFdmVudCA9IGV2ZW50c1swXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0NoZWNrIGVuZGluZy5cclxuICAgICAgICAgICAgICAgIEVuZGluZyBlbmRpbmcgPSBDaGVja0dhbWVPdmVyKGFsYXJtTGV2ZWwsIGNvbmZpZGVuY2UsIHN0b3J5bGluZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW5kaW5nICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBIYW5kbGVFbmRpbmcoZW5kaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKEBcIkRvIHlvdSB3YW50IHRvIHBsYXkgYWdhaW4/IChQcmVzcyBcIlwiclwiXCIgdG8gcmVwbGF5IG9yIFwiXCJxXCJcIiB0byBxdWl0IHRoZSBnYW1lLlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9MZXR0aW5nIHRoZSBwbGF5ZXIgY2hvc2Ugd2hldGhlciB0byByZXBsYXkgdGhlIGdhbWUgb3IgcXVpdC5cclxuICAgICAgICAgICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29uc29sZUtleUluZm8ga2V5SW5mbyA9IGF3YWl0IENvbnNvbGUuUmVhZEtleSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklucHV0ID0ga2V5SW5mby5LZXlDaGFyLlRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlcklucHV0ID09IFwicVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VySW5wdXQgPT0gXCJyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNldFN0YXJ0aW5nU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3J5bGluZS5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52ZW50b3J5LkNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IHdoaWxlICh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0NsZWFyaW5nIHByZXZpb3VzIHRleHQgYW5kIG91dHB1dCB0aGUgVUkuXHJcbiAgICAgICAgICAgICAgICBDb25zb2xlLkNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShzdHJpbmcuRm9ybWF0KFwiQ29uZmlkZW5jZTp7MH0gQWxhcm0gTGV2ZWw6ezF9XFxuXCIsY29uZmlkZW5jZSxhbGFybUxldmVsKSk7XHJcbiAgICAgICAgICAgICAgICBQcmludFNjcmlwdChjdXJyZW50RXZlbnQuTmFycmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvc3NpYmxlQ2hvaWNlcyA9IG5ldyBMaXN0PENob2ljZT4oKTtcclxuICAgICAgICAgICAgICAgIHZhciBub3RQb3NzaWJsZUNob2ljZXMgPSBuZXcgTGlzdDxDaG9pY2U+KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9DaGVjayB3aGljaCBjaG9pY2VzIGFyZSBwb3NzaWJsZSBhbmQgd2hpY2ggb25lcyBhcmUgbm90XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoIChDaG9pY2UgY2hvaWNlIGluIGN1cnJlbnRFdmVudC5DaG9pY2VzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChJc0Nob2ljZVBvc3NpYmxlKGNob2ljZSwgY29uZmlkZW5jZSwgc3RvcnlsaW5lLCBpbnZlbnRvcnkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVDaG9pY2VzLkFkZChjaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RQb3NzaWJsZUNob2ljZXMuQWRkKGNob2ljZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vT3V0cHV0IGNob2ljZXMgdGhhdCBhcmUgcG9zc2libGVcclxuICAgICAgICAgICAgICAgIGludCBjb3VudGVyID0gMTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKENob2ljZSBjaG9pY2UgaW4gcG9zc2libGVDaG9pY2VzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFByaW50U2NyaXB0KHN0cmluZy5Gb3JtYXQoXCJ7MH0uIHsxfVwiLGNvdW50ZXIsY2hvaWNlLk5hbWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9PdXRwdXQgY2hvaWNlcyB0aGF0IGFyZSBub3QgcG9zc2libGVcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuRm9yZWdyb3VuZENvbG9yID0gQ29uc29sZUNvbG9yLkRhcmtHcmF5O1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAoQ2hvaWNlIGNob2ljZSBpbiBub3RQb3NzaWJsZUNob2ljZXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJpbnRTY3JpcHQoc3RyaW5nLkZvcm1hdChcInswfS4gPz8/XCIsY291bnRlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIENvbnNvbGUuRm9yZWdyb3VuZENvbG9yID0gQ29uc29sZUNvbG9yLldoaXRlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vU2VsZWN0cyBhIGNob2ljZSBiYXNlZCBvbiB0aGUgcGxheWVycyBpbnB1dC5cclxuICAgICAgICAgICAgICAgIENob2ljZSBzZWxlY3RlZENob2ljZTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENvbnNvbGVLZXlJbmZvIGtleUluZm8gPSBhd2FpdCBDb25zb2xlLlJlYWRLZXkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklucHV0ID0ga2V5SW5mby5LZXlDaGFyLlRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSZWdleC5Jc01hdGNoKHVzZXJJbnB1dCwgXCJcXFxcZFwiKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludFVzZXJJbnB1dCA9IGludC5QYXJzZSh1c2VySW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW50VXNlcklucHV0ID4gMCAmJiBpbnRVc2VySW5wdXQgPD0gcG9zc2libGVDaG9pY2VzLkNvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENob2ljZSA9IHBvc3NpYmxlQ2hvaWNlc1tpbnRVc2VySW5wdXQgLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGludFVzZXJJbnB1dCA+IHBvc3NpYmxlQ2hvaWNlcy5Db3VudCAmJiBpbnRVc2VySW5wdXQgPD0gY3VycmVudEV2ZW50LkNob2ljZXMuQ291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByaW50U2NyaXB0KFwiSXQgc2VlbXMgbGlrZSB5b3VyIGNvbmZpZGVuY2UgaXMgbGFja2luZywgb3IgcGVyaGFwcyB5b3UgYXJlIG1pc3Npbmcgc29tZXRoaW5nP1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByaW50U2NyaXB0KFwiVHJ5IG9uZSBvZiB0aGUgbGlzdGVkIG51bWJlcnMuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vQ2hlYXQgZGlzcGxheSB0byBlbmRpbmdzLlxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFJlZ2V4LklzTWF0Y2godXNlcklucHV0LCBcImVcIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShcIkVudGVyIGVuZGluZyBudW1iZXJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgY2hlYXQgPSBhd2FpdCBDb25zb2xlLlJlYWRMaW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlYXQgPT0gXCIxXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxhcm1MZXZlbCA9IDY7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hlYXQgPT0gXCIyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlkZW5jZSA9IDU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxhcm1MZXZlbCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcnlsaW5lLkFkZChcIkVzY2FwZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGVhdCA9PSBcIjNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWRlbmNlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGFybUxldmVsID0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yeWxpbmUuQWRkKFwiRXNjYXBlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoZWF0ID09IFwiNFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2UgPSA1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsYXJtTGV2ZWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3J5bGluZS5BZGQoXCJFc2NhcGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hlYXQgPT0gXCI1XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlkZW5jZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxhcm1MZXZlbCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcnlsaW5lLkFkZChcIkVzY2FwZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGVhdCA9PSBcIjZcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWRlbmNlID0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGFybUxldmVsID0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZlbnRvcnkuQWRkKFwiRXNjYXBlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwiPz8/XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRpbmcgPSBDaGVja0dhbWVPdmVyKGFsYXJtTGV2ZWwsIGNvbmZpZGVuY2UsIHN0b3J5bGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW5kaW5nICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGFuZGxlRW5kaW5nKGVuZGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcmludFNjcmlwdChcIlRyeSBvbmUgb2YgdGhlIGxpc3RlZCBudW1tYmVycy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vRGlzcGxheSBjaG9pY2UuXHJcbiAgICAgICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZSgpO1xyXG4gICAgICAgICAgICAgICAgUHJpbnRTY3JpcHQoc2VsZWN0ZWRDaG9pY2UuTmFycmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IENvbnNvbGUuUmVhZEtleSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWRlbmNlICs9IHNlbGVjdGVkQ2hvaWNlLkNvbmZpZGVuY2VBbHRlcmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZGVuY2UgPCAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGFsYXJtTGV2ZWwgKz0gc2VsZWN0ZWRDaG9pY2UuQWxhcm1MZXZlbEFsdGVyYXRpb247XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxhcm1MZXZlbCA8IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxhcm1MZXZlbCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFsYXJtTGV2ZWwgPiA2KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsYXJtTGV2ZWwgPSA2O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vQWRkcyBmb3VuZCBpdGVtIHRvIGludmVudG9yeS5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZENob2ljZS5TcGVjaWFsSXRlbUdhaW5lZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGludmVudG9yeS5BZGQoc2VsZWN0ZWRDaG9pY2UuU3BlY2lhbEl0ZW1HYWluZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vUmVjb3JkIGN1cnJlbnQgc3RvcnlsaW5lLlxyXG4gICAgICAgICAgICAgICAgc3RvcnlsaW5lLkFkZChjdXJyZW50RXZlbnQuTmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Nb3ZlIHRvIHRoZSBuZXh0IGV2ZW50LlxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRFdmVudC5OYW1lID09IFwiS25pZ2h0cyBjYW1wXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludmVudG9yeS5Db250YWlucyhcIk1haW4gZW50cmFuY2VcIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEV2ZW50ID0gR2V0RXZlbnQoXCJUaGUgbWFpbiBlbnRyYW5jZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW52ZW50b3J5LkNvbnRhaW5zKFwiVW5kZXJncm91bmQgdHVubmVsc1wiKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFdmVudCA9IEdldEV2ZW50KFwiVGhlIHVuZGVyZ3JvdW5kIHR1bm5lbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEV2ZW50ID0gR2V0RXZlbnQoXCJUaGUgc2VjcmV0IGRvb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RXZlbnQuTmFtZSA9PSBcIkRyYWdvbnMnIGhvYXJkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW52ZW50b3J5LkNvbnRhaW5zKFwiVW5kZXJncm91bmQgdHVubmVsc1wiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEV2ZW50ID0gR2V0RXZlbnQoXCJQaWNrIGV4aXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRFdmVudC5OYW1lID09IFwiSGVscCBrbmlnaHRcIilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW52ZW50b3J5LkNvbnRhaW5zKFwiS25pZ2h0cyBtYXJrXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yeWxpbmUuUmVtb3ZlKFwiSGVscCBrbmlnaHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RXZlbnQuTmFtZSA9PSBcIkVtcHR5IGhvYXJkXCIgJiYgc2VsZWN0ZWRDaG9pY2UuTmFtZSA9PSBcIlNhdmUgdGhlIGtuaWdodFwiIHx8IGN1cnJlbnRFdmVudC5OYW1lID09IFwiRW1wdHkgaG9hcmQgd2l0aCBrbmlnaHRcIiAmJiBzZWxlY3RlZENob2ljZS5OYW1lID09IFwiU2F2ZSB0aGUga25pZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGFybUxldmVsID0gNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcnlsaW5lLkFkZChcIkRyYWdvbiBlbmNvdW50ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RXZlbnQgPSBHZXRFdmVudChzZWxlY3RlZENob2ljZS5OZXh0RXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdG9yeWxpbmUuQ29udGFpbnMoXCJIaWRkaW5nIGZyb20gdGhlIGRyYWdvblwiKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yeWxpbmUuUmVtb3ZlKFwiRHJhZ29uIGVuY291bnRlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gd2hpbGUgKHRydWUpO1xyXG4gICAgICAgIH1cclxucHJpdmF0ZSBkZWxlZ2F0ZSB2b2lkIF9fX0luaXRpYWxpemVJbnRlZ2VyUGFyYW1ldGVyX0RlbGVnYXRlXzAocmVmIGludCBwYXJhbWV0ZXIsIHN0cmluZyB0ZXh0LCBzdHJpbmcgcmVnZXgpO3ByaXZhdGUgZGVsZWdhdGUgdm9pZCBfX19Jbml0aWFsaXplU3RyaW5nUGFyYW1ldGVyX0RlbGVnYXRlXzEocmVmIHN0cmluZyBwYXJhbWV0ZXIsIHN0cmluZyB0ZXh0LCBzdHJpbmcgcmVnZXgpO3ByaXZhdGUgZGVsZWdhdGUgdm9pZCBfX19Jbml0aWFsaXplU3RyaW5nQXJyYXlQYXJhbWV0ZXJfRGVsZWdhdGVfMihyZWYgc3RyaW5nW10gcGFyYW1ldGVyLCBzdHJpbmcgdGV4dCwgc3RyaW5nIHJlZ2V4KTsgICAgfVxyXG59Il0KfQo=
