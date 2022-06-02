using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace Text_based_game
{
    class Ending
    {
        public string Name;
        public string Narration;
        public string[] EventRequirements;
        public int MinimumConfidence = 0;
        public int MaximumConfidence = Int32.MaxValue;
        public int MinimumAlarmLevel = 0;
        public int MaximumAlarmLevel = 6;
    }
    class Event
    {
        public string Name;
        public string Narration;
        public List<Choice> Choices;
    }
    class Choice
    {
        public int MinimumConfidence;
        public int ConfidenceAlteration;
        public int AlarmLevelAlteration;
        public string EventRequirement;
        public string SpecialItemRequirement;
        public string SpecialItemGained;
        public string Narration;
        public string Name;
        public string NextEvent;
    }
    internal class Program
    {
        static List<Event> events = new List<Event>();
        static List<Ending> endings = new List<Ending>();

        static void PrintScript(string text)
        {
            string[] words = text.Split(" ");
            foreach (string word in words)
            {
                int totalWidth = Console.WindowWidth - 4;
                int cursourPosition = Console.CursorLeft;
                int charactersLeft = totalWidth - cursourPosition;

                if (charactersLeft < word.Length)
                {
                    Console.WriteLine();
                }

                Console.Write($"{word} ");
                System.Threading.Thread.Sleep(40);
            }
            Console.WriteLine();
        }
        //A method which checks if the game is over and gives the matching ending to HandleEnding.
        static Ending CheckGameOver(int alarmLevel, int confidence, List<string> storyline)
        {
            foreach (Ending ending in endings)
            {
                if (confidence < ending.MinimumConfidence)
                {
                    continue;
                }

                if (confidence > ending.MaximumConfidence)
                {
                    continue;
                }

                if (alarmLevel < ending.MinimumAlarmLevel)
                {
                    continue;
                }

                if (alarmLevel > ending.MaximumAlarmLevel)
                {
                    continue;
                }

                if (ending.EventRequirements != null)
                {
                    bool eventRequirementsAreMet = true;
                    foreach (string eventRequirement in ending.EventRequirements)
                    {
                        if (!storyline.Contains(eventRequirement))
                        {
                            eventRequirementsAreMet = false;
                        }
                    }

                    if (!eventRequirementsAreMet)
                    {
                        continue;
                    }

                }

                return ending;
            }
            return null;

        }
        //A method which outputs the ending received from CheckGameOver.
        static void HandleEnding(Ending ending)
        {
            Console.WriteLine(ending.Name);
            PrintScript(ending.Narration);
        }
        //Set the next event.
        static Event GetEvent(string name)
        {
            Event result = events.Find(storyEvent => storyEvent.Name == name);
            if (result != null)
            {
                return result;
            }
            throw new ArgumentException("Event does not exist");
        }
        //Checks conditions for the choices of the current event.
        static bool IsChoicePossible(Choice choice, int confidence, List<string> storyline, List<string> inventory)
        {
            if (confidence < choice.MinimumConfidence)
            {
                return false;
            }

            if (choice.EventRequirement != null && !storyline.Contains(choice.EventRequirement))
            {
                return false;
            }

            if (choice.SpecialItemRequirement != null && !inventory.Contains(choice.SpecialItemRequirement))
            {
                return false;
            }

            return true;
        }
        static void Main(string[] args)
        {
            Console.Clear();
            Console.CursorVisible = false;
            Console.WindowWidth = 86;
            Console.WindowHeight = 27;
            Console.BufferWidth = Console.WindowWidth;
            Console.BufferHeight = Console.WindowHeight;

            //Initialization
            //Reading files and then splitting them when needed.
            string eventsPath = "Events.txt";
            string eventsText = File.ReadAllText(eventsPath);
            string[] eventGroups = eventsText.Split("\r\n\r\n");

            string choicesPath = "Choices.txt";
            string choicesText = File.ReadAllText(choicesPath);
            string[] choiceGroups = choicesText.Split("\r\n\r\n\r\n");

            string endPath = "Endings.txt";
            string endText = File.ReadAllText(endPath);
            string[] endGroups = endText.Split("\r\n\r\n");

            string titleScreenPath = "Fortune favor the bold title screen.txt";
            string titleScreen = File.ReadAllText(titleScreenPath);
            string[] titleLines = titleScreen.Split("\r\n");


            void InitializeIntegerParameter(ref int parameter, string text, string regex)
            {
                Match info = Regex.Match(text, regex);
                if (info.Success)
                {
                    parameter = Int32.Parse(info.Groups[1].Value);
                }
            }

            void InitializeStringParameter(ref string parameter, string text, string regex)
            {
                Match info = Regex.Match(text, regex);
                if (info.Success)
                {
                    parameter = info.Groups[1].Value;
                }
            }

            void InitializeStringArrayParameter(ref string[] parameter, string text, string regex)
            {
                Match info = Regex.Match(text, regex);
                if (info.Success)
                {
                    parameter = info.Groups[1].Value.Split(", ");
                }
            }

            //Initialize choices and events.
            for (int eventIndex = 0; eventIndex < eventGroups.Length; eventIndex++)
            {
                //List of choices in individual events.
                var eventChoices = new List<Choice>();
                string[] choicesPerEvent = choiceGroups[eventIndex].Split("\r\n\r\n");

                //Using regex to find individual items in the choice file.
                foreach (string choiceInfoText in choicesPerEvent)
                {
                    Match choiceInfo = Regex.Match(choiceInfoText, "Name: (.*)\\r\\nNarration: (.*)\\r");

                    //Choice class definition.
                    var choice = new Choice();
                    choice.Name = choiceInfo.Groups[1].Value;
                    choice.Narration = choiceInfo.Groups[2].Value;

                    InitializeIntegerParameter(ref choice.ConfidenceAlteration, choiceInfoText, "Confidence alteration: ([^\\r]*)");
                    InitializeIntegerParameter(ref choice.AlarmLevelAlteration, choiceInfoText, "Alarm level alteration: ([^\\r]*)");
                    InitializeIntegerParameter(ref choice.MinimumConfidence, choiceInfoText, "Minimum confidence: ([^\\r]*)");
                    InitializeStringParameter(ref choice.SpecialItemRequirement, choiceInfoText, "Special item requirement: ([^\\r]*)");
                    InitializeStringParameter(ref choice.SpecialItemGained, choiceInfoText, "Special item gained: ([^\\r]*)");
                    InitializeStringParameter(ref choice.EventRequirement, choiceInfoText, "Event requriement: ([^\\r]*)");
                    InitializeStringParameter(ref choice.NextEvent, choiceInfoText, "Next event: ([^\\r]*)");


                    //Adding choices into a list that goes to event class.
                    eventChoices.Add(choice);
                }

                //Using regex to find individual items in the events file.
                Match eventInfo = Regex.Match(eventGroups[eventIndex], "Name: (.*)\\r\\nNarration: (.*)");

                //Event class definition.
                var newEvent = new Event();
                newEvent.Name = eventInfo.Groups[1].Value;
                newEvent.Narration = eventInfo.Groups[2].Value;
                newEvent.Choices = eventChoices;
                events.Add(newEvent);
            }

            //Initialize endings.
            foreach (string endGroup in endGroups)
            {
                Ending ending = new Ending();

                InitializeStringParameter(ref ending.Name, endGroup, "Name: ([^\\r]+)");
                InitializeStringParameter(ref ending.Narration, endGroup, "Narration: ([^\\r]+)");
                InitializeStringArrayParameter(ref ending.EventRequirements, endGroup, "Event requirement: ([^\\r]+)");
                InitializeIntegerParameter(ref ending.MinimumConfidence, endGroup, "Minimum confidence: ([^\\r]+)");
                InitializeIntegerParameter(ref ending.MaximumConfidence, endGroup, "Maximum confidence: ([^\\r]+)");
                InitializeIntegerParameter(ref ending.MinimumAlarmLevel, endGroup, "Minimum alarm level: ([^\\r]+)");
                InitializeIntegerParameter(ref ending.MaximumAlarmLevel, endGroup, "Maximum alarm level: ([^\\r]+)");

                endings.Add(ending);
            }


            //Display title screen with color.
            foreach (string line in titleLines)
            {
                MatchCollection colorMatches = Regex.Matches(line, "(?:\\*(\\d{1,2})\\*|^)(.*?)(?=\\*\\d{1,2}\\*|$)");
                foreach (Match colorMatch in colorMatches)
                {
                    if (colorMatch.Success)
                    {
                        if (colorMatch.Groups[1].Success)
                        {
                            int titleColor = Convert.ToInt32(colorMatch.Groups[1].Value);
                            ConsoleColor color = (ConsoleColor)titleColor;
                            Console.ForegroundColor = color;
                        }
                        Console.Write(colorMatch.Groups[2].Value);
                    }
                }
                Console.WriteLine();
            }
            Console.ReadKey();

            Console.ForegroundColor = ConsoleColor.White;

            //Gameplay
            int confidence;
            int alarmLevel;
            Event currentEvent;

            void SetStartingState()
            {
                confidence = 1;
                alarmLevel = 0;
                currentEvent = events[4];
            }

            SetStartingState();

            string userInput;
            int intUserInput;

            //List of events the player has cleared.
            var storyline = new List<string>();
            //List of special item player has gained.
            var inventory = new List<string>();

            //Game intro.
            Console.Clear();
            PrintScript("A lone thief has set up camp in a forest. Less than a day away has a dragon made its lair. The thief has gathered what confidence they could find and has made it this far...");
            PrintScript("Will their confidence grow or falter? Will the dragon spot them or will they go unseen...");
            PrintScript("Only time will tell...");
            Console.WriteLine();
            PrintScript("Press enter to commence with the theft.");
            Console.ReadKey(true);


            do
            {
                //Alarm check.
                if (alarmLevel == 5 && !storyline.Contains("Dragon encounter"))
                {
                    currentEvent = events[0];
                }

                //Check ending.
                Ending ending = CheckGameOver(alarmLevel, confidence, storyline);
                if (ending != null)
                {
                    Console.WriteLine();
                    HandleEnding(ending);
                    Console.WriteLine();
                    Console.WriteLine(@"Do you want to play again? (Press ""r"" to replay or ""q"" to quit the game.");

                    //Letting the player chose whether to replay the game or quit.
                    do
                    {
                        ConsoleKeyInfo keyInfo = Console.ReadKey(true);
                        userInput = keyInfo.KeyChar.ToString();

                        if (userInput == "q")
                        {
                            return;
                        }

                        if (userInput == "r")
                        {
                            SetStartingState();
                            storyline.Clear();
                            inventory.Clear();
                            break;
                        }

                    } while (true);
                }

                //Clearing previous text and output the UI.
                Console.Clear();
                Console.WriteLine($"Confidence:{confidence} Alarm Level:{alarmLevel}\n");
                PrintScript(currentEvent.Narration);
                Console.WriteLine();

                var possibleChoices = new List<Choice>();
                var notPossibleChoices = new List<Choice>();

                //Check which choices are possible and which ones are not
                foreach (Choice choice in currentEvent.Choices)
                {
                    if (IsChoicePossible(choice, confidence, storyline, inventory))
                    {
                        possibleChoices.Add(choice);
                    }
                    else
                    {
                        notPossibleChoices.Add(choice);
                    }
                }

                //Output choices that are possible
                int counter = 1;
                foreach (Choice choice in possibleChoices)
                {
                    PrintScript($"{counter}. {choice.Name}");
                    counter++;
                }

                //Output choices that are not possible
                Console.ForegroundColor = ConsoleColor.DarkGray;
                foreach (Choice choice in notPossibleChoices)
                {
                    PrintScript($"{counter}. ???");
                    counter++;
                }
                Console.ForegroundColor = ConsoleColor.White;

                //Selects a choice based on the players input.
                Choice selectedChoice;

                do
                {
                    ConsoleKeyInfo keyInfo = Console.ReadKey(true);
                    userInput = keyInfo.KeyChar.ToString();

                    if (Regex.IsMatch(userInput, "\\d"))
                    {
                        intUserInput = int.Parse(userInput);
                        if (intUserInput > 0 && intUserInput <= possibleChoices.Count)
                        {
                            selectedChoice = possibleChoices[intUserInput - 1];
                            break;
                        }
                        else if (intUserInput > possibleChoices.Count && intUserInput <= currentEvent.Choices.Count)
                        {
                            PrintScript("It seems like your confidence is lacking, or perhaps you are missing something?");
                        }
                        else
                        {
                            PrintScript("Try one of listed numbers.");
                        }
                    }
                    //Cheat display to endings.
                    else if (Regex.IsMatch(userInput, "e"))
                    {
                        Console.WriteLine("Enter ending number");

                        do
                        {
                            string cheat = Console.ReadLine();
                            if (cheat == "1")
                            {
                                alarmLevel = 6;

                            }
                            else if (cheat == "2")
                            {
                                confidence = 5;
                                alarmLevel = 3;
                                storyline.Add("Escape");

                            }
                            else if (cheat == "3")
                            {
                                confidence = 0;
                                alarmLevel = 3;
                                storyline.Add("Escape");

                            }
                            else if (cheat == "4")
                            {
                                confidence = 5;
                                alarmLevel = 0;
                                storyline.Add("Escape");

                            }
                            else if (cheat == "5")
                            {
                                confidence = 0;
                                alarmLevel = 0;
                                storyline.Add("Escape");

                            }
                            else if (cheat == "6")
                            {
                                confidence = 3;
                                alarmLevel = 3;
                                inventory.Add("Escape");
                            }
                            else
                            {
                                Console.WriteLine("???");
                                return;
                            }

                            ending = CheckGameOver(alarmLevel, confidence, storyline);
                            if (ending != null)
                            {
                                HandleEnding(ending);
                                Console.WriteLine();
                            }

                        } while (true);
                    }
                    else
                    {
                        PrintScript("Try one of the listed nummbers.");
                    }

                } while (true);

                //Display choice.
                Console.WriteLine();
                PrintScript(selectedChoice.Narration);
                Console.ReadKey(true);

                confidence += selectedChoice.ConfidenceAlteration;
                if (confidence < 0)
                {
                    confidence = 0;
                }

                alarmLevel += selectedChoice.AlarmLevelAlteration;
                if (alarmLevel < 0)
                {
                    alarmLevel = 0;
                }

                if (alarmLevel > 6)
                {
                    alarmLevel = 6;
                }

                //Adds found item to inventory.
                if (selectedChoice.SpecialItemGained != null)
                {
                    inventory.Add(selectedChoice.SpecialItemGained);
                }

                //Record current storyline.
                storyline.Add(currentEvent.Name);

                //Move to the next event.
                if (currentEvent.Name == "Knights camp")
                {
                    if (inventory.Contains("Main entrance"))
                    {

                        currentEvent = GetEvent("The main entrance");
                    }
                    else if (inventory.Contains("Underground tunnels"))
                    {
                        currentEvent = GetEvent("The underground tunnel");
                    }
                    else
                    {
                        currentEvent = GetEvent("The secret door");
                    }
                }
                else
                {
                    if (currentEvent.Name == "Dragons' hoard")
                    {
                        if (inventory.Contains("Underground tunnels"))
                        {
                            currentEvent = GetEvent("Pick exit");
                            continue;
                        }
                    }

                    if (currentEvent.Name == "Help knight")
                    {
                        if (!inventory.Contains("Knights mark"))
                        {
                            storyline.Remove("Help knight");
                        }
                    }

                    if (currentEvent.Name == "Empty hoard" && selectedChoice.Name == "Save the knight" || currentEvent.Name == "Empty hoard with knight" && selectedChoice.Name == "Save the knight")
                    {
                        alarmLevel = 5;
                        storyline.Add("Dragon encounter");
                    }

                    currentEvent = GetEvent(selectedChoice.NextEvent);
                }

                if (storyline.Contains("Hidding from the dragon"))
                {
                    storyline.Remove("Dragon encounter");
                }

            } while (true);
        }
    }
}