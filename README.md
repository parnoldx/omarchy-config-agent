# Omarchy AI Tools

Explore some usages of AI for OMARCHY

## `omarchy-config-agent`

The `omarchy-config-agent` is an intelligent assistant that helps you configure your Omarchy system using simple, natural language commands. It understands your requests and safely applies the necessary changes to your system's configuration files. For claude code but should be working for other LLM cli's

**How to Use:**     
    Simply start `omarchy-config-agent` 
1.  **Tell the agent what you want to configure:**

2.  **Review and Confirm:**
    The agent will then propose a plan of action based on your request. It will show you exactly what changes it intends to make. You will have the opportunity to review these changes and confirm whether you want to proceed.

3.  **Agent Executes:**
    Once you confirm, the agent will execute the plan, making the requested configuration changes to your system.

## `omarchy-ask`

The `omarchy-ask` explores some different non interactive ux for asking. But questions can also just be asked to the omarchy-config-agent. Only claude code

**How to Use:**

```bash
omarchy-ask "How do i close windows"
omarchy-ask "How to define keybindings"
omarchy-ask "How do i set a wallpaper" // not the best answer right now, no theming knowledge added yet
omarchy-ask // for interactive question input
```