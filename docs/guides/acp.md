# Agents / ACP

Memoh can connect a bot to ACP-compatible coding agents. ACP agents are external coding workflows that can work from the bot's chat workspace while keeping their sessions separate from normal chat and discuss conversations.

Current setup examples visible in Memoh include Codex and Claude Code. Treat them as supported setup paths, not as the only possible ACP-compatible agents over time.

---

## Setup Flow

1. Open a bot's **Detail Page**.
2. Go to the **Agents** tab.
3. Enable the agent you want to use.
4. Choose the setup or authentication mode shown by that agent, such as OAuth, API key, or self-managed setup.
5. Save the configuration.
6. Open the chat workspace and start the enabled agent from there.

The exact fields depend on the selected agent because each ACP integration owns its own authentication and setup requirements.

---

## ACP Agent Sessions

ACP work uses the `acp_agent` session type. These sessions are created and managed by the Agents/ACP workflow.

They are not created through normal `/new chat` or `/new discuss` routing. In the Web UI, you can filter sessions by `acp_agent` to find coding-agent work separately from everyday conversations.

---

## Attachments

ACP Agent sessions currently do not support message attachments. Use a normal chat session when you need to send files or images directly to the bot.

---

## Related Pages

- [Bot Management](/guides/bot.md)
- [Sessions](/guides/sessions.md)
- [Files](/guides/files.md)
