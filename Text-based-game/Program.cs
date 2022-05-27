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
        //A method which checks if the game is over.
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
                            break;
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
        //A method which checks which ending the player got if the game is over.
        static void HandleEnding(Ending ending)
        {
            Console.WriteLine(ending.Name);
            PrintScript(ending.Narration);
        }

        //Gets the next event.
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
            Console.CursorVisible = false;
            Console.WindowWidth = 84;
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

            //Color for title screen
            foreach (char charackter in titleScreen)
            {
                string charackterString = Convert.ToString(charackter);
                Match colorMatch = Regex.Match(charackterString, "\\/(\\d+)");
                int titleColor = Convert.ToInt32(colorMatch.Groups[1].Value);
                ConsoleColor color = (ConsoleColor)titleColor;

                if (colorMatch.Success)
                {
                    Console.ForegroundColor = color;
                }

                Console.Write(charackter);
            }
            Console.ReadKey();


            //Initializ choices and events.
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

                    Match confidenceInfo = Regex.Match(choiceInfoText, "Confidence alteration: ([^\\r]*)");
                    if (confidenceInfo.Success)
                    {
                        int intConfidenceAlteration = Int32.Parse(confidenceInfo.Groups[1].Value);
                        choice.ConfidenceAlteration = intConfidenceAlteration;
                    }

                    Match alarmInfo = Regex.Match(choiceInfoText, "Alarm level alteration: ([^\\r]*)");
                    if (alarmInfo.Success)
                    {
                        int intAlarmLevelAlteration = Int32.Parse(alarmInfo.Groups[1].Value);
                        choice.AlarmLevelAlteration = intAlarmLevelAlteration;
                    }

                    Match minimumConfidenceInfo = Regex.Match(choiceInfoText, "Minimum confidence: ([^\\r]*)");
                    if (minimumConfidenceInfo.Success)
                    {
                        int intMinimumConfidence = Int32.Parse(minimumConfidenceInfo.Groups[1].Value);
                        choice.MinimumConfidence = intMinimumConfidence;
                    }

                    Match specialItemRequirementInfo = Regex.Match(choiceInfoText, "Special item requirement: ([^\\r]*)");
                    if (specialItemRequirementInfo.Success)
                    {
                        choice.SpecialItemRequirement = specialItemRequirementInfo.Groups[1].Value;
                    }

                    Match specialItemGainedInfo = Regex.Match(choiceInfoText, "Special item gained: ([^\\r]*)");
                    if (specialItemGainedInfo.Success)
                    {
                        choice.SpecialItemGained = specialItemGainedInfo.Groups[1].Value;
                    }

                    Match eventRequirementInfo = Regex.Match(choiceInfoText, "Event requriement: ([^\\r]*)");
                    if (eventRequirementInfo.Success)
                    {
                        choice.EventRequirement = eventRequirementInfo.Groups[1].Value;
                    }

                    Match nextEventInfo = Regex.Match(choiceInfoText, "Next event: ([^\\r]*)");
                    if (nextEventInfo.Success)
                    {
                        choice.NextEvent = nextEventInfo.Groups[1].Value;
                    }

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

            //Initializ endings.
            foreach (string endGroup in endGroups)
            {
                Ending ending = new Ending();

                Match endNameInfo = Regex.Match(endGroup, "Name: ([^\\r]+)");
                if (endNameInfo.Success)
                {
                    ending.Name = endNameInfo.Groups[1].Value;
                }

                Match endNarrationInfo = Regex.Match(endGroup, "Narration: ([^\\r]+)");
                if (endNarrationInfo.Success)
                {
                    ending.Narration = endNarrationInfo.Groups[1].Value;
                }

                Match endEventRequirementInfo = Regex.Match(endGroup, "Event requirement: ([^\\r]+)");
                if (endEventRequirementInfo.Success)
                {
                    string[] eventRequitements = endEventRequirementInfo.Groups[1].Value.Split(", ");
                    ending.EventRequirements = eventRequitements;
                }

                Match endMinConfidenceInfo = Regex.Match(endGroup, "Minimum confidence: ([^\\r]+)");
                if (endMinConfidenceInfo.Success)
                {
                    int intEndMinConfidenceInfo = Int32.Parse(endMinConfidenceInfo.Groups[1].Value);
                    ending.MinimumConfidence = intEndMinConfidenceInfo;
                }

                Match endMaxConfidenceInfo = Regex.Match(endGroup, "Maximum confidence: ([^\\r]+)");
                if (endMaxConfidenceInfo.Success)
                {
                    int intEndMaxConfidenceInfo = Int32.Parse(endMaxConfidenceInfo.Groups[1].Value);
                    ending.MaximumConfidence = intEndMaxConfidenceInfo;
                }

                Match endMinAlarmLevelInfo = Regex.Match(endGroup, "Minimum alarm level: ([^\\r]+)");
                if (endMinAlarmLevelInfo.Success)
                {
                    int intEndMinAlarmLevelInfo = Int32.Parse(endMinAlarmLevelInfo.Groups[1].Value);
                    ending.MinimumAlarmLevel = intEndMinAlarmLevelInfo;
                }

                Match endMaxAlarmLevelInfo = Regex.Match(endGroup, "Maximum alarm level: ([^\\r]+)");
                if (endMaxAlarmLevelInfo.Success)
                {
                    int intEndMaxAlarmLevelInfo = Int32.Parse(endMaxAlarmLevelInfo.Groups[1].Value);
                    ending.MaximumAlarmLevel = intEndMaxAlarmLevelInfo;
                }


                endings.Add(ending);
            }


            //Gameplay
            int confidence = 1;
            int alarmLevel = 0;
            string userInput;
            int intUserInput;

            //List of events the player has cleared.
            var storyline = new List<string>();
            //List of special item player has gained.
            var inventory = new List<string>();

            //TODO: Colors for titlescreen ev. others
            //Display titlescreen
            //Console.Clear();
            //Console.Write(titleScreen);
            //Console.ReadKey();

            //Game intro.
            Console.Clear();
            PrintScript("A lone thief has set up camp in a forest. Less than a day away has a dragon made its lair. The thief has gathered what confidence they could find and has made it this far...");
            PrintScript("Will their confidence grow or fallter? Will the dragon spot them or will they go unseen...");
            PrintScript("Only time will tell...");
            Console.WriteLine();
            PrintScript("Press enter to commence with the theft.");
            Console.ReadKey(true);

            Event currentEvent = events[4];

            do
            {
                //Alarm check
                if (alarmLevel == 5 && !storyline.Contains("Dragon encounter"))
                {
                    currentEvent = events[0];
                }

                //Check ending
                Ending ending = CheckGameOver(alarmLevel, confidence, storyline);
                if (ending != null)
                {
                    HandleEnding(ending);
                    break;
                }

                //Clearing previous text and output UI.
                Console.Clear();
                Console.WriteLine($"Confidence:{confidence} Alarm Level:{alarmLevel}\n");
                PrintScript(currentEvent.Narration);
                var possibleChoices = new List<Choice>();
                foreach (Choice choice in currentEvent.Choices)
                {
                    if (IsChoicePossible(choice, confidence, storyline, inventory))
                    {
                        possibleChoices.Add(choice);
                    }
                }

                int counter = 1;
                foreach (Choice choice in possibleChoices)
                {
                    PrintScript($"{counter}. {choice.Name}");
                    counter++;
                }

                //Selects a choice based on the players input.
                Choice selectedChoice;

                do
                {
                    ConsoleKeyInfo keyInfo = Console.ReadKey(true);
                    userInput = keyInfo.KeyChar.ToString();

                    if (Regex.IsMatch(userInput, "\\d"))
                    {
                        try
                        {
                            intUserInput = int.Parse(userInput);
                            selectedChoice = possibleChoices[intUserInput - 1];

                            break;
                        }
                        catch (ArgumentOutOfRangeException)
                        {
                            PrintScript("Try one of listed numbers.");
                        }
                    }
                    //Cheat display to endings
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

                //Display choice
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

                //Adds found item to inventory.
                if (selectedChoice.SpecialItemGained != null)
                {
                    inventory.Add(selectedChoice.SpecialItemGained);
                }

                storyline.Add(currentEvent.Name);

                //Move to next event
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

                    if (currentEvent.Name == "The knight and the dragon")
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
